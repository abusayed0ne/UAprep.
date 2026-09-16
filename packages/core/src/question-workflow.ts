import { assertTransition } from './state-machine.js';

export const QUESTION_STATUSES = [
  'RESEARCH_BRIEF','DRAFT','SUBMITTED','AUTO_CHECK_FAILED','IN_REVIEW',
  'REVISION_REQUIRED','ANSWER_VALIDATION','FAIRNESS_REVIEW','RIGHTS_REVIEW',
  'APPROVAL_PENDING','APPROVED_FOR_PILOT','PILOTING','APPROVED_PRODUCTION',
  'QUARANTINED','RETIRED','ARCHIVED',
] as const;
export type QuestionStatus = (typeof QUESTION_STATUSES)[number];

export const QUESTION_TRANSITIONS: Readonly<Record<QuestionStatus, readonly QuestionStatus[]>> = {
  RESEARCH_BRIEF: ['DRAFT'], DRAFT: ['SUBMITTED'],
  SUBMITTED: ['AUTO_CHECK_FAILED','IN_REVIEW'], AUTO_CHECK_FAILED: ['DRAFT'],
  IN_REVIEW: ['REVISION_REQUIRED','ANSWER_VALIDATION'], REVISION_REQUIRED: ['DRAFT'],
  ANSWER_VALIDATION: ['REVISION_REQUIRED','FAIRNESS_REVIEW'],
  FAIRNESS_REVIEW: ['REVISION_REQUIRED','RIGHTS_REVIEW'],
  RIGHTS_REVIEW: ['REVISION_REQUIRED','APPROVAL_PENDING'],
  APPROVAL_PENDING: ['REVISION_REQUIRED','APPROVED_FOR_PILOT'],
  APPROVED_FOR_PILOT: ['PILOTING','RETIRED'],
  PILOTING: ['APPROVED_PRODUCTION','QUARANTINED'],
  APPROVED_PRODUCTION: ['QUARANTINED','RETIRED'],
  QUARANTINED: ['REVISION_REQUIRED','RETIRED'], RETIRED: ['ARCHIVED'], ARCHIVED: [],
};

export interface QuestionTransitionContext {
  actorId: string;
  setterId: string;
  rightsPublishable: boolean;
  blockingLintCount: number;
}

export function assertQuestionTransition(from: QuestionStatus, to: QuestionStatus, context: QuestionTransitionContext): void {
  assertTransition(QUESTION_TRANSITIONS, from, to);
  if (to === 'APPROVED_FOR_PILOT' && context.actorId === context.setterId) throw new Error('Setter cannot approve their own question');
  if (to === 'APPROVAL_PENDING' && !context.rightsPublishable) throw new Error('Publishable rights are required');
  if (to === 'IN_REVIEW' && context.blockingLintCount > 0) throw new Error('Blocking lint results must be resolved');
}

export type LintSeverity = 'ERROR' | 'WARNING';
export interface QuestionLintResult { code: string; severity: LintSeverity; field?: string; message: string; }
