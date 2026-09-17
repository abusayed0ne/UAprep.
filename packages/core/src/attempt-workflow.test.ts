import{describe,expect,it}from'vitest';
import{assertAttemptTransition,isDeadlineExpired}from'./attempt-workflow.js';
describe('attempt reliability',()=>{
  it('rejects a late answer at the exact server deadline',()=>{const deadline=new Date('2030-01-01T00:00:00.000Z');expect(isDeadlineExpired(deadline,new Date(deadline))).toBe(true);});
  it('accepts work strictly before the server deadline',()=>expect(isDeadlineExpired(new Date(1001),new Date(1000))).toBe(false));
  it('prevents returning a submitted attempt to in-progress',()=>expect(()=>assertAttemptTransition('SUBMITTED','IN_PROGRESS')).toThrow(/not allowed/));
  it('supports the controlled release and rescore lifecycle',()=>{expect(()=>assertAttemptTransition('SCORED','RELEASED')).not.toThrow();expect(()=>assertAttemptTransition('RELEASED','RESCORE_PENDING')).not.toThrow();expect(()=>assertAttemptTransition('RESCORE_PENDING','RELEASED')).not.toThrow();});
});
