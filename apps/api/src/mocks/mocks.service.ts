import { createHash } from 'node:crypto';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { database, Prisma } from '@uaprep/db';
import { isMockPublishable, validateMockCandidate } from '@uaprep/core';
import type { RequestContext } from '../request-context.js';
import { createBlueprintSchema, createMockSchema, createMockVersionSchema } from './dto.js';

@Injectable()
export class MocksService {
  async createBlueprint(ctx: RequestContext, input: unknown) {
    const data = createBlueprintSchema.parse(input);
    const pattern = await database.admissionPatternVersion.findFirst({ where: { id: data.patternVersionId, status: 'PUBLISHED', pattern: { university: { tenantId: ctx.principal.tenantId } } } });
    if (!pattern) throw new BadRequestException('Published tenant pattern version is required');
    if (new Set(data.sections.map((section) => section.position)).size !== data.sections.length) throw new BadRequestException('Blueprint section positions must be unique');
    const subjectIds = [...new Set(data.sections.flatMap((section) => section.subjectId ? [section.subjectId] : []))];
    const subjectCount = await database.subject.count({ where: { id: { in: subjectIds }, tenantId: ctx.principal.tenantId } });
    if (subjectCount !== subjectIds.length) throw new BadRequestException('Blueprint subject does not belong to tenant');
    return database.$transaction(async (tx) => {
      const row = await tx.mockBlueprint.create({ data: {
        tenantId: ctx.principal.tenantId, patternVersionId: data.patternVersionId, name: data.name,
        description: data.description ?? null, createdById: ctx.principal.userId,
        sections: { create: data.sections.map((section) => ({
          name: section.name, position: section.position, subjectId: section.subjectId ?? null,
          requiredCount: section.requiredCount, totalMarks: section.totalMarks, durationSeconds: section.durationSeconds,
          topicCoverage: section.topicCoverage, difficultyDistribution: section.difficultyDistribution,
          allowedQuestionTypes: section.allowedQuestionTypes, exposureLimit: section.exposureLimit,
          randomizationPolicy: section.randomizationPolicy as Prisma.InputJsonValue,
          explanationsRequired: section.explanationsRequired,
        })) },
      } });
      await this.audit(tx, ctx, 'MOCK_BLUEPRINT_CREATED', 'MockBlueprint', row.id);
      return row;
    });
  }

  async createMock(ctx: RequestContext, input: unknown) {
    const data = createMockSchema.parse(input);
    const blueprint = await this.blueprint(ctx, data.blueprintId);
    const scoring = await database.scoringPolicyVersion.findFirst({ where: { id: data.scoringPolicyVersionId, tenantId: ctx.principal.tenantId, publishedAt: { not: null } } });
    if (!scoring) throw new BadRequestException('Published scoring policy is required');
    if (new Set(data.sections.map((section) => section.position)).size !== data.sections.length) throw new BadRequestException('Mock section positions must be unique');
    for (const section of data.sections) if (!blueprint.sections.some((rule) => rule.position === section.position)) throw new BadRequestException(`Section ${section.position} is not in blueprint`);
    const versionIds = data.sections.flatMap((section) => section.questionVersionIds);
    const ownedCount = await database.questionVersion.count({ where: { id: { in: [...new Set(versionIds)] }, question: { tenantId: ctx.principal.tenantId } } });
    if (ownedCount !== new Set(versionIds).size) throw new BadRequestException('Question version does not belong to tenant');
    return database.$transaction(async (tx) => {
      const mock = await tx.mock.create({ data: { tenantId: ctx.principal.tenantId, blueprintId: blueprint.id, name: data.name } });
      const version = await tx.mockVersion.create({ data: {
        mockId: mock.id, version: 1, patternVersionId: blueprint.patternVersionId,
        scoringPolicyVersionId: data.scoringPolicyVersionId, blueprintId: blueprint.id,
        sections: { create: data.sections.map((section) => {
          const rule = blueprint.sections.find((item) => item.position === section.position)!;
          return { name: rule.name, position: rule.position, durationSeconds: rule.durationSeconds, totalMarks: rule.totalMarks,
            items: { create: section.questionVersionIds.map((questionVersionId, index) => ({ questionVersionId, position: index + 1 })) } };
        }) },
      } });
      await this.audit(tx, ctx, 'MOCK_DRAFT_CREATED', 'MockVersion', version.id);
      return version;
    });
  }

  async validate(ctx: RequestContext, id: string) {
    const mock = await this.mockVersion(ctx, id);
    if (mock.status === 'PUBLISHED') throw new ConflictException('Published mock version is immutable');
    const versionIds = mock.sections.flatMap((section) => section.items.map((item) => item.questionVersionId));
    const exposures = versionIds.length ? await database.mockItem.groupBy({ by: ['questionVersionId'], where: { questionVersionId: { in: versionIds }, mockSection: { mockVersion: { status: 'PUBLISHED' } } }, _count: { questionVersionId: true } }) : [];
    const exposureMap = new Map(exposures.map((item) => [item.questionVersionId, item._count.questionVersionId]));
    const issues = validateMockCandidate({
      blueprintSections: mock.mock.blueprint.sections.map((rule) => ({ position: rule.position, name: rule.name, requiredCount: rule.requiredCount, totalMarks: Number(rule.totalMarks), durationSeconds: rule.durationSeconds, topicCoverage: rule.topicCoverage as Record<string, number>, difficultyDistribution: rule.difficultyDistribution as Record<string, number>, allowedQuestionTypes: rule.allowedQuestionTypes, exposureLimit: rule.exposureLimit, explanationsRequired: rule.explanationsRequired })),
      candidateSections: mock.sections.map((section) => ({ position: section.position, name: section.name, items: section.items.map((item) => ({ questionVersionId: item.questionVersionId, questionStatus: item.questionVersion.question.status, rightsStatus: item.questionVersion.rightsStatus, questionType: item.questionVersion.questionType, topicId: item.questionVersion.objective.topicId, difficulty: item.questionVersion.intendedDifficulty, marks: Number(item.questionVersion.marks), hasExplanation: Boolean(item.questionVersion.studentExplanation.trim()), exposureCount: exposureMap.get(item.questionVersionId) ?? 0 })) })),
      patternSections: mock.patternVersion.sections.map((section) => ({ position: section.position, questionCount: section.questionCount, marks: Number(section.marks), durationSeconds: section.durationSeconds })),
    });
    const inputHash = createHash('sha256').update(JSON.stringify({ mockVersionId: id, questionVersionIds: versionIds, issues })).digest('hex');
    const isValid = isMockPublishable(issues);
    return database.$transaction(async (tx) => {
      await tx.mockValidationReport.create({ data: { mockVersionId: id, isValid, issues: issues as unknown as Prisma.InputJsonValue, inputHash, validatedById: ctx.principal.userId } });
      await tx.mockVersion.update({ where: { id }, data: { status: isValid ? 'READY' : 'DRAFT', validationHash: inputHash } });
      return { isValid, inputHash, issues };
    });
  }

  async createVersion(ctx: RequestContext, mockId: string, input: unknown) {
    const data = createMockVersionSchema.parse(input);
    const root = await database.mock.findFirst({ where: { id: mockId, tenantId: ctx.principal.tenantId }, include: { blueprint: { include: { sections: true } }, versions: { orderBy: { version: 'desc' }, take: 1 } } });
    if (!root) throw new NotFoundException();
    const scoring = await database.scoringPolicyVersion.findFirst({ where: { id: data.scoringPolicyVersionId, tenantId: ctx.principal.tenantId, publishedAt: { not: null } } });
    if (!scoring) throw new BadRequestException('Published scoring policy is required');
    const versionIds = data.sections.flatMap((section) => section.questionVersionIds);
    const ownedCount = await database.questionVersion.count({ where: { id: { in: [...new Set(versionIds)] }, question: { tenantId: ctx.principal.tenantId } } });
    if (ownedCount !== new Set(versionIds).size) throw new BadRequestException('Question version does not belong to tenant');
    return database.$transaction(async (tx) => {
      const version = await tx.mockVersion.create({ data: {
        mockId, version: (root.versions[0]?.version ?? 0) + 1, patternVersionId: root.blueprint.patternVersionId,
        scoringPolicyVersionId: data.scoringPolicyVersionId, blueprintId: root.blueprintId,
        sections: { create: data.sections.map((section) => {
          const rule = root.blueprint.sections.find((item) => item.position === section.position);
          if (!rule) throw new BadRequestException(`Section ${section.position} is not in blueprint`);
          return { name: rule.name, position: rule.position, durationSeconds: rule.durationSeconds, totalMarks: rule.totalMarks,
            items: { create: section.questionVersionIds.map((questionVersionId, index) => ({ questionVersionId, position: index + 1 })) } };
        }) },
      } });
      await this.audit(tx, ctx, 'MOCK_VERSION_CREATED', 'MockVersion', version.id);
      return version;
    });
  }

  async publish(ctx: RequestContext, id: string) {
    const currentValidation = await this.validate(ctx, id);
    if (!currentValidation.isValid) throw new ConflictException({ message: 'Mock validation failed', issues: currentValidation.issues });
    const mock = await this.mockVersion(ctx, id);
    if (mock.status !== 'READY' || !mock.validationHash) throw new ConflictException('A valid current validation report is required');
    const report = await database.mockValidationReport.findFirst({ where: { mockVersionId: id, inputHash: mock.validationHash, isValid: true }, orderBy: { createdAt: 'desc' } });
    if (!report) throw new ConflictException('Validation report is missing');
    return database.$transaction(async (tx) => {
      const updated = await tx.mockVersion.updateMany({ where: { id, status: 'READY', publishedAt: null }, data: { status: 'PUBLISHED', publishedAt: new Date() } });
      if (updated.count !== 1) throw new ConflictException('Mock was already published or changed');
      await this.audit(tx, ctx, 'MOCK_PUBLISHED', 'MockVersion', id);
      return tx.mockVersion.findUniqueOrThrow({ where: { id } });
    });
  }

  async get(ctx: RequestContext, id: string) { return this.mockVersion(ctx, id); }
  private async blueprint(ctx: RequestContext, id: string) { const row = await database.mockBlueprint.findFirst({ where: { id, tenantId: ctx.principal.tenantId, active: true }, include: { sections: true } }); if (!row) throw new NotFoundException(); return row; }
  private async mockVersion(ctx: RequestContext, id: string) { const row = await database.mockVersion.findFirst({ where: { id, mock: { tenantId: ctx.principal.tenantId } }, include: { mock: { include: { blueprint: { include: { sections: true } } } }, patternVersion: { include: { sections: true } }, sections: { include: { items: { include: { questionVersion: { include: { question: true, objective: true } } } } } } } }); if (!row) throw new NotFoundException(); return row; }
  private async audit(tx: Prisma.TransactionClient, ctx: RequestContext, eventType: string, resourceType: string, resourceId: string) { await tx.auditEvent.create({ data: { tenantId: ctx.principal.tenantId, actorId: ctx.principal.userId, eventType, resourceType, resourceId, correlationId: ctx.correlationId } }); }
}
