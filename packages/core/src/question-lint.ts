import type { QuestionLintResult } from './question-workflow.js';

export interface LintableOption { content:string; isCorrect:boolean; }
export interface LintableQuestion {
  questionType:string;
  stem:string;
  objectiveId:string;
  solution:string;
  studentExplanation:string;
  marks:number;
  wrongPenalty:number;
  sourceType:string;
  rightsStatus:string;
  provenance:unknown;
  options:readonly LintableOption[];
  mediaReferences?:readonly { key:string; resolved:boolean }[];
}
const PUBLISHABLE_RIGHTS = new Set(['INTERNAL_ORIGINAL','LICENSED','OPEN_LICENSE_VERIFIED','PUBLIC_DOMAIN_VERIFIED']);
const objectiveTypes = new Set(['SINGLE_CHOICE','MULTIPLE_CHOICE','TRUE_FALSE']);
const normalize = (value:string) => value.normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();

export function normalizedQuestionHashInput(stem:string,options:readonly LintableOption[]):string {
  return `${normalize(stem)}|${options.map(option=>normalize(option.content)).sort().join('|')}`;
}

export function lintQuestion(item:LintableQuestion):QuestionLintResult[] {
  const results:QuestionLintResult[]=[];
  const error=(code:string,field:string,message:string)=>results.push({code,severity:'ERROR',field,message});
  const warning=(code:string,field:string,message:string)=>results.push({code,severity:'WARNING',field,message});
  if(!item.stem.trim()) error('STEM_REQUIRED','stem','Question stem is required');
  if(!item.objectiveId) error('OBJECTIVE_REQUIRED','objectiveId','Learning objective is required');
  if(!item.solution.trim()) error('SOLUTION_REQUIRED','solution','Worked solution is required');
  if(!item.studentExplanation.trim()) error('EXPLANATION_REQUIRED','studentExplanation','Student explanation is required');
  if(item.marks<=0) error('INVALID_MARKS','marks','Marks must be positive');
  if(item.wrongPenalty<0||item.wrongPenalty>item.marks) error('INVALID_PENALTY','wrongPenalty','Penalty must be between zero and marks');
  if(!item.sourceType||item.provenance===null||item.provenance===undefined) error('PROVENANCE_REQUIRED','provenance','Source and provenance are required');
  if(!PUBLISHABLE_RIGHTS.has(item.rightsStatus)) error('RIGHTS_NOT_PUBLISHABLE','rightsStatus','Publishable rights status is required');
  if(objectiveTypes.has(item.questionType)) {
    if(item.options.length<2) error('OPTIONS_REQUIRED','options','Objective questions require at least two options');
    const correct=item.options.filter(option=>option.isCorrect).length;
    if(item.questionType==='SINGLE_CHOICE'&&correct!==1) error('SINGLE_KEY_REQUIRED','options','Single-choice question must have exactly one correct option');
    if(item.questionType==='MULTIPLE_CHOICE'&&correct<1) error('KEY_REQUIRED','options','At least one correct option is required');
    const normalized=item.options.map(option=>normalize(option.content));
    if(new Set(normalized).size!==normalized.length) error('DUPLICATE_OPTIONS','options','Options must be unique after normalization');
    const lengths=item.options.map(option=>option.content.trim().length);
    const correctIndex=item.options.findIndex(option=>option.isCorrect);
    if(correctIndex>=0&&lengths.length>=4&&lengths[correctIndex]! > Math.max(...lengths.filter((_,index)=>index!==correctIndex))*2) warning('OPTION_LENGTH_CUE','options','Correct option is substantially longer than distractors');
  }
  if(item.mediaReferences?.some(media=>!media.resolved)) error('MEDIA_UNRESOLVED','mediaReferences','Every media reference must resolve');
  return results;
}

export function canPublishRights(status:string):boolean { return PUBLISHABLE_RIGHTS.has(status); }
