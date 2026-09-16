import { describe, expect, it } from 'vitest';
import { assertQuestionTransition } from './question-workflow.js';
const base = { actorId:'reviewer', setterId:'setter', rightsPublishable:true, blockingLintCount:0 };
describe('question workflow', () => {
  it('setter_cannot_approve_own_question', () => expect(() => assertQuestionTransition('APPROVAL_PENDING','APPROVED_FOR_PILOT',{...base,actorId:'setter'})).toThrow(/cannot approve/i));
  it('requires publishable rights', () => expect(() => assertQuestionTransition('RIGHTS_REVIEW','APPROVAL_PENDING',{...base,rightsPublishable:false})).toThrow(/rights/i));
  it('rejects workflow jumps', () => expect(() => assertQuestionTransition('DRAFT','APPROVED_PRODUCTION',base)).toThrow(/not allowed/i));
});
