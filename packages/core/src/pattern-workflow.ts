import { assertTransition } from './state-machine.js';
export const PATTERN_STATUSES = ['DRAFT','UNDER_REVIEW','CHANGES_REQUESTED','APPROVED','PUBLISHED','STALE','SUPERSEDED','ARCHIVED'] as const;
export type PatternStatus = (typeof PATTERN_STATUSES)[number];
const transitions: Readonly<Record<PatternStatus, readonly PatternStatus[]>> = {
  DRAFT:['UNDER_REVIEW'], UNDER_REVIEW:['CHANGES_REQUESTED','APPROVED'], CHANGES_REQUESTED:['DRAFT'],
  APPROVED:['PUBLISHED'], PUBLISHED:['STALE','SUPERSEDED'], STALE:['UNDER_REVIEW','SUPERSEDED'],
  SUPERSEDED:['ARCHIVED'], ARCHIVED:[],
};
export function assertPatternTransition(from: PatternStatus, to: PatternStatus, approvedEvidenceCount: number): void {
  assertTransition(transitions, from, to);
  if ((to === 'APPROVED' || to === 'PUBLISHED') && approvedEvidenceCount < 1) throw new Error('Approved evidence is required');
}
