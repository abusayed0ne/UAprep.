import { assertTransition } from './state-machine.js';
export const ATTEMPT_STATUSES = ['CREATED','IN_PROGRESS','SUBMISSION_PENDING','SUBMITTED','SCORING','AWAITING_MANUAL_MARKING','SCORED','RELEASED','RESCORE_PENDING','EXPIRED'] as const;
export type AttemptStatus = (typeof ATTEMPT_STATUSES)[number];
const transitions: Readonly<Record<AttemptStatus, readonly AttemptStatus[]>> = {
  CREATED:['IN_PROGRESS','EXPIRED'], IN_PROGRESS:['SUBMISSION_PENDING','EXPIRED'],
  SUBMISSION_PENDING:['SUBMITTED'], SUBMITTED:['SCORING'],
  SCORING:['AWAITING_MANUAL_MARKING','SCORED'], AWAITING_MANUAL_MARKING:['SCORED'],
  SCORED:['RELEASED'], RELEASED:['RESCORE_PENDING'], RESCORE_PENDING:['RELEASED'], EXPIRED:[],
};
export function assertAttemptTransition(from: AttemptStatus, to: AttemptStatus): void { assertTransition(transitions, from, to); }
export function isDeadlineExpired(deadlineAt: Date, serverNow: Date): boolean { return serverNow.getTime() >= deadlineAt.getTime(); }
