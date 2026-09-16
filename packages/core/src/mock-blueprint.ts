export type MockValidationSeverity='ERROR'|'WARNING';
export interface MockValidationIssue { code:string; severity:MockValidationSeverity; sectionPosition?:number; questionVersionId?:string; message:string; }
export interface BlueprintSectionRule {
  position:number; name:string; requiredCount:number; totalMarks:number; durationSeconds:number;
  topicCoverage:Readonly<Record<string,number>>; difficultyDistribution:Readonly<Record<string,number>>;
  allowedQuestionTypes:readonly string[]; exposureLimit:number; explanationsRequired:boolean;
}
export interface MockCandidateItem { questionVersionId:string; questionStatus:string; rightsStatus:string; questionType:string; topicId:string; difficulty:string; marks:number; hasExplanation:boolean; exposureCount:number; }
export interface MockCandidateSection { position:number; name:string; items:readonly MockCandidateItem[]; }
export interface PatternSectionRule { position:number; questionCount:number; marks:number; durationSeconds:number; }
export interface MockValidationInput { blueprintSections:readonly BlueprintSectionRule[]; candidateSections:readonly MockCandidateSection[]; patternSections:readonly PatternSectionRule[]; }
const publishableRights=new Set(['INTERNAL_ORIGINAL','LICENSED','OPEN_LICENSE_VERIFIED','PUBLIC_DOMAIN_VERIFIED']);

export function validateMockCandidate(input:MockValidationInput):MockValidationIssue[]{
  const issues:MockValidationIssue[]=[];const error=(code:string,message:string,sectionPosition?:number,questionVersionId?:string)=>issues.push({code,severity:'ERROR',...(sectionPosition!==undefined?{sectionPosition}:{}),...(questionVersionId?{questionVersionId}:{}),message});
  const allIds=input.candidateSections.flatMap(section=>section.items.map(item=>item.questionVersionId));
  const duplicates=allIds.filter((id,index)=>allIds.indexOf(id)!==index);for(const id of new Set(duplicates))error('DUPLICATE_MOCK_ITEM','Question version appears more than once',undefined,id);
  for(const rule of input.blueprintSections){const section=input.candidateSections.find(x=>x.position===rule.position);if(!section){error('SECTION_MISSING',`Required section ${rule.name} is missing`,rule.position);continue;}
    if(section.items.length!==rule.requiredCount)error('QUESTION_COUNT_MISMATCH',`Expected ${rule.requiredCount}, received ${section.items.length}`,rule.position);
    const marks=section.items.reduce((sum,item)=>sum+item.marks,0);if(Math.abs(marks-rule.totalMarks)>0.0001)error('MARKS_MISMATCH',`Expected ${rule.totalMarks} marks, received ${marks}`,rule.position);
    for(const item of section.items){if(item.questionStatus!=='APPROVED_PRODUCTION')error('QUESTION_NOT_PRODUCTION','Only production-approved questions may publish',rule.position,item.questionVersionId);if(!publishableRights.has(item.rightsStatus))error('RIGHTS_NOT_PUBLISHABLE','Question rights are not publishable',rule.position,item.questionVersionId);if(!rule.allowedQuestionTypes.includes(item.questionType))error('QUESTION_TYPE_NOT_ALLOWED','Question type is not allowed by blueprint',rule.position,item.questionVersionId);if(rule.explanationsRequired&&!item.hasExplanation)error('EXPLANATION_REQUIRED','Question explanation is required',rule.position,item.questionVersionId);if(item.exposureCount>=rule.exposureLimit)error('EXPOSURE_LIMIT_REACHED','Question exposure limit has been reached',rule.position,item.questionVersionId);}
    for(const [topicId,min] of Object.entries(rule.topicCoverage)){const actual=section.items.filter(item=>item.topicId===topicId).length;if(actual<min)error('TOPIC_COVERAGE_MISSING',`Topic ${topicId} requires ${min}; received ${actual}`,rule.position);}
    for(const [difficulty,count] of Object.entries(rule.difficultyDistribution)){const actual=section.items.filter(item=>item.difficulty===difficulty).length;if(actual!==count)error('DIFFICULTY_MIX_MISMATCH',`${difficulty} requires ${count}; received ${actual}`,rule.position);}
    const pattern=input.patternSections.find(x=>x.position===rule.position);if(!pattern)error('PATTERN_SECTION_MISSING','Blueprint section has no matching pattern section',rule.position);else{if(pattern.questionCount!==rule.requiredCount)error('PATTERN_COUNT_MISMATCH','Blueprint count differs from pattern',rule.position);if(Math.abs(pattern.marks-rule.totalMarks)>0.0001)error('PATTERN_MARKS_MISMATCH','Blueprint marks differ from pattern',rule.position);if(pattern.durationSeconds!==rule.durationSeconds)error('PATTERN_DURATION_MISMATCH','Blueprint duration differs from pattern',rule.position);}
  }
  return issues;
}

export function isMockPublishable(issues:readonly MockValidationIssue[]):boolean{return !issues.some(issue=>issue.severity==='ERROR');}
