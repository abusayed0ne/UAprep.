import { describe,expect,it } from 'vitest';
import { lintQuestion,normalizedQuestionHashInput } from './question-lint.js';
const valid={questionType:'SINGLE_CHOICE',stem:'A newly authored demo question?',objectiveId:'lo1',solution:'Because this is the worked solution.',studentExplanation:'A clear explanation.',marks:1,wrongPenalty:0,sourceType:'ORIGINAL_IN_HOUSE',rightsStatus:'INTERNAL_ORIGINAL',provenance:{author:'staff'},options:[{content:'Correct',isCorrect:true},{content:'Distractor',isCorrect:false}]};
describe('question lint',()=>{
  it('accepts a complete original item',()=>expect(lintQuestion(valid)).toEqual([]));
  it('rejects multiple keys for single choice',()=>expect(lintQuestion({...valid,options:valid.options.map(x=>({...x,isCorrect:true}))}).map(x=>x.code)).toContain('SINGLE_KEY_REQUIRED'));
  it('rejects duplicate normalized options',()=>expect(lintQuestion({...valid,options:[{content:' Same ',isCorrect:true},{content:'same',isCorrect:false}]}).map(x=>x.code)).toContain('DUPLICATE_OPTIONS'));
  it('creates order-independent normalized input',()=>expect(normalizedQuestionHashInput('  Hello  ',[...valid.options].reverse())).toBe(normalizedQuestionHashInput('hello',valid.options)));
});
