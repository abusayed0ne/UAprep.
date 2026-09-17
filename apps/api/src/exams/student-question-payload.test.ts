import{describe,expect,it}from'vitest';
import{studentQuestionPayload}from'./student-question-payload.js';
describe('studentQuestionPayload',()=>{it('never exposes answer keys, solutions, explanations, or provenance',()=>{
  const payload=studentQuestionPayload({id:'version-1',questionType:'SINGLE_CHOICE',stem:'Demo?',marks:1,solution:'secret solution',studentExplanation:'secret explanation',provenance:{source:'secret source'},normalizedHash:'secret hash',options:[{position:1,content:'Wrong',isCorrect:false},{position:2,content:'Correct',isCorrect:true}]},[2,1]);
  expect(payload).toEqual({id:'version-1',type:'SINGLE_CHOICE',stem:'Demo?',marks:1,options:[{position:2,content:'Correct'},{position:1,content:'Wrong'}]});
  expect(JSON.stringify(payload)).not.toMatch(/isCorrect|solution|explanation|provenance|normalizedHash/i);
});});
