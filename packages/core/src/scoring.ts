export type RoundingMode='HALF_UP'|'DOWN'|'UP';
export interface ObjectiveScoringRule { useQuestionMarks:boolean; correctPoints:number; useQuestionPenalty:boolean; wrongPenalty:number; skipPoints:number; scale:number; roundingMode:RoundingMode; }
export interface ScorableAnswer { questionVersionId:string; sectionId:string; questionMarks:number; questionPenalty:number; correctOptionPositions:readonly number[]; selectedOptionPositions:readonly number[]; }
export interface AnswerScore { questionVersionId:string; sectionId:string; outcome:'CORRECT'|'INCORRECT'|'SKIPPED'; points:number; }
export interface AttemptScoreResult { total:number; answers:readonly AnswerScore[]; sections:Readonly<Record<string,number>>; }
const sorted=(values:readonly number[])=>[...values].sort((a,b)=>a-b);
const equal=(a:readonly number[],b:readonly number[])=>JSON.stringify(sorted(a))===JSON.stringify(sorted(b));
function round(value:number,scale:number,mode:RoundingMode){const factor=10**scale;const scaled=value*factor;const result=mode==='DOWN'?Math.floor(scaled):mode==='UP'?Math.ceil(scaled):Math.round(scaled);return result/factor;}
export function scoreObjectiveAttempt(rule:ObjectiveScoringRule,answers:readonly ScorableAnswer[]):AttemptScoreResult{
  const results=answers.map((answer):AnswerScore=>{const selected=answer.selectedOptionPositions;if(selected.length===0)return{questionVersionId:answer.questionVersionId,sectionId:answer.sectionId,outcome:'SKIPPED',points:round(rule.skipPoints,rule.scale,rule.roundingMode)};if(equal(selected,answer.correctOptionPositions))return{questionVersionId:answer.questionVersionId,sectionId:answer.sectionId,outcome:'CORRECT',points:round(rule.useQuestionMarks?answer.questionMarks:rule.correctPoints,rule.scale,rule.roundingMode)};return{questionVersionId:answer.questionVersionId,sectionId:answer.sectionId,outcome:'INCORRECT',points:round(-(rule.useQuestionPenalty?answer.questionPenalty:rule.wrongPenalty),rule.scale,rule.roundingMode)};});
  const sections:Record<string,number>={};for(const item of results)sections[item.sectionId]=round((sections[item.sectionId]??0)+item.points,rule.scale,rule.roundingMode);
  return{total:round(results.reduce((sum,item)=>sum+item.points,0),rule.scale,rule.roundingMode),answers:results,sections};
}
