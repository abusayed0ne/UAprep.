import{describe,expect,it}from'vitest';
import{isAnswerReviewReleased}from'./review-release.js';
describe('answer review release',()=>{
  it.each(['IN_PROGRESS','SUBMITTED','SCORING','SCORED','RESCORE_PENDING','EXPIRED'])('does not expose keys while status is %s',status=>expect(isAnswerReviewReleased(status)).toBe(false));
  it('allows review only after explicit release',()=>expect(isAnswerReviewReleased('RELEASED')).toBe(true));
});
