import {describe,expect,it} from 'vitest';
import {isMockPublishable,validateMockCandidate,type MockValidationInput} from './mock-blueprint.js';
const input:MockValidationInput={blueprintSections:[{position:1,name:'Demo',requiredCount:1,totalMarks:1,durationSeconds:60,topicCoverage:{t1:1},difficultyDistribution:{MEDIUM:1},allowedQuestionTypes:['SINGLE_CHOICE'],exposureLimit:3,explanationsRequired:true}],candidateSections:[{position:1,name:'Demo',items:[{questionVersionId:'qv1',questionStatus:'APPROVED_PRODUCTION',rightsStatus:'INTERNAL_ORIGINAL',questionType:'SINGLE_CHOICE',topicId:'t1',difficulty:'MEDIUM',marks:1,hasExplanation:true,exposureCount:0}]}],patternSections:[{position:1,questionCount:1,marks:1,durationSeconds:60}]};
describe('mock blueprint validator',()=>{
  it('accepts a compliant candidate',()=>expect(validateMockCandidate(input)).toEqual([]));
  it('rejects unapproved questions',()=>{const changed={...input,candidateSections:[{...input.candidateSections[0]!,items:[{...input.candidateSections[0]!.items[0]!,questionStatus:'QUARANTINED'}]}]};expect(validateMockCandidate(changed).map(x=>x.code)).toContain('QUESTION_NOT_PRODUCTION');});
  it('rejects duplicate versions',()=>{const item=input.candidateSections[0]!.items[0]!;const changed={...input,blueprintSections:[{...input.blueprintSections[0]!,requiredCount:2,totalMarks:2,difficultyDistribution:{MEDIUM:2}}],candidateSections:[{...input.candidateSections[0]!,items:[item,item]}],patternSections:[{...input.patternSections[0]!,questionCount:2,marks:2}]};expect(validateMockCandidate(changed).map(x=>x.code)).toContain('DUPLICATE_MOCK_ITEM');});
  it('fails publication on blocking issues',()=>expect(isMockPublishable([{code:'X',severity:'ERROR',message:'blocked'}])).toBe(false));
});
