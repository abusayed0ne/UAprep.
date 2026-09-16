import { z } from 'zod';
const slug = z.string().min(2).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const createUniversitySchema = z.object({ name:z.string().trim().min(2).max(160), slug, isDemo:z.boolean().default(true) });
export const createProgramSchema = z.object({ name:z.string().trim().min(2).max(160), code:z.string().trim().min(1).max(40).optional() });
export const createEvidenceSchema = z.object({
  claimType:z.string().trim().min(2).max(100), tier:z.enum(['A_OFFICIAL_CURRENT','B_OFFICIAL_SUPPORTING','C_VERIFIED_COMMUNICATION','D_RESEARCH_LEAD']),
  sourceType:z.string().trim().min(2).max(80), sourceReference:z.string().trim().min(3).max(2048), snapshotHash:z.string().max(256).optional(),
  observedAt:z.coerce.date(), effectiveAt:z.coerce.date().optional(), nextReviewAt:z.coerce.date().optional(), notes:z.string().max(4000).optional(),
  claims:z.array(z.object({ programId:z.string().min(1).optional(), intake:z.string().max(80).optional(), claimType:z.string().min(2).max(100), statement:z.string().min(3).max(4000), effectiveFrom:z.coerce.date().optional(), effectiveUntil:z.coerce.date().optional() })).min(1),
});
export const createSubjectSchema = z.object({ name:z.string().trim().min(2).max(120), slug, description:z.string().max(1000).optional() });
export const createTopicSchema = z.object({ name:z.string().trim().min(2).max(120), slug });
export const createSubtopicSchema = createTopicSchema.extend({ description:z.string().max(1000).optional() });
export const createObjectiveSchema = z.object({ statement:z.string().trim().min(5).max(1000), code:z.string().trim().max(40).optional(), subtopicId:z.string().min(1).optional() });
export const createPatternSchema = z.object({ name:z.string().trim().min(2).max(160) });
export const createPatternVersionSchema = z.object({
  intake:z.string().max(80).optional(), effectiveFrom:z.coerce.date().optional(), effectiveUntil:z.coerce.date().optional(), evidenceSourceIds:z.array(z.string().min(1)).default([]), programIds:z.array(z.string().min(1)).default([]),
  sections:z.array(z.object({ name:z.string().min(1).max(120), position:z.number().int().positive(), subjectId:z.string().min(1).optional(), questionType:z.string().min(1).max(80), questionCount:z.number().int().positive(), marks:z.number().positive(), durationSeconds:z.number().int().positive(), wrongPenalty:z.number().min(0).default(0), calculatorPolicy:z.string().max(200).optional(), passRule:z.json().optional() })).default([]),
});
export const transitionPatternSchema = z.object({ to:z.enum(['UNDER_REVIEW','CHANGES_REQUESTED','APPROVED','PUBLISHED','STALE','SUPERSEDED','ARCHIVED']), reason:z.string().trim().min(3).max(1000) });
