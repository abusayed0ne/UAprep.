export const EVIDENCE_TIERS = ['A_OFFICIAL_CURRENT','B_OFFICIAL_SUPPORTING','C_VERIFIED_COMMUNICATION','D_RESEARCH_LEAD'] as const;
export type EvidenceTier = (typeof EVIDENCE_TIERS)[number];

export interface EvidenceForPattern {
  id:string;
  tier:EvidenceTier;
  status:'DRAFT'|'APPROVED'|'STALE'|'SUPERSEDED';
  nextReviewAt?:Date;
}
export interface PatternSectionConfiguration {
  position:number;
  name:string;
  questionType:string;
  questionCount:number;
  marks:number;
  durationSeconds:number;
  wrongPenalty:number;
}
export interface PatternPublicationCandidate {
  evidence:readonly EvidenceForPattern[];
  programIds:readonly string[];
  effectiveFrom:Date;
  effectiveUntil?:Date;
  sections:readonly PatternSectionConfiguration[];
}
export interface ConfigurationIssue { code:string; field:string; message:string; }

export function validatePatternPublication(candidate:PatternPublicationCandidate, now = new Date()):ConfigurationIssue[] {
  const issues:ConfigurationIssue[] = [];
  const authoritative = candidate.evidence.filter((item) => item.status === 'APPROVED' && item.tier !== 'D_RESEARCH_LEAD');
  if (authoritative.length === 0) issues.push({code:'APPROVED_EVIDENCE_REQUIRED',field:'evidence',message:'At least one approved Tier A, B, or C source is required'});
  if (authoritative.some((item) => item.nextReviewAt && item.nextReviewAt <= now)) issues.push({code:'EVIDENCE_REVIEW_DUE',field:'evidence',message:'Evidence review is due'});
  if (candidate.programIds.length === 0) issues.push({code:'PROGRAM_APPLICABILITY_REQUIRED',field:'programIds',message:'At least one program must be linked'});
  if (candidate.sections.length === 0) issues.push({code:'SECTION_REQUIRED',field:'sections',message:'At least one section is required'});
  if (candidate.effectiveUntil && candidate.effectiveUntil <= candidate.effectiveFrom) issues.push({code:'INVALID_EFFECTIVE_RANGE',field:'effectiveUntil',message:'Effective-until must be after effective-from'});
  const positions = new Set<number>();
  for (const section of candidate.sections) {
    if (positions.has(section.position)) issues.push({code:'DUPLICATE_SECTION_POSITION',field:'sections',message:`Section position ${section.position} is duplicated`});
    positions.add(section.position);
    if (section.position < 1) issues.push({code:'INVALID_POSITION',field:'sections',message:'Section position must be positive'});
    if (section.questionCount < 1) issues.push({code:'INVALID_QUESTION_COUNT',field:'sections',message:'Question count must be positive'});
    if (section.marks <= 0) issues.push({code:'INVALID_MARKS',field:'sections',message:'Marks must be positive'});
    if (section.durationSeconds < 1) issues.push({code:'INVALID_DURATION',field:'sections',message:'Duration must be positive'});
    if (section.wrongPenalty > section.marks) issues.push({code:'INVALID_PENALTY',field:'sections',message:'Wrong-answer penalty cannot exceed section marks'});
  }
  return issues;
}

export interface EffectiveRange { id:string; effectiveFrom:Date; effectiveUntil?:Date; programIds:readonly string[]; }
export function findOverlappingPatternIds(candidate:EffectiveRange, existing:readonly EffectiveRange[]):string[] {
  const candidateEnd = candidate.effectiveUntil?.getTime() ?? Number.POSITIVE_INFINITY;
  return existing.filter((item) => {
    const sharesProgram = item.programIds.some((id) => candidate.programIds.includes(id));
    const existingEnd = item.effectiveUntil?.getTime() ?? Number.POSITIVE_INFINITY;
    return sharesProgram && candidate.effectiveFrom.getTime() < existingEnd && item.effectiveFrom.getTime() < candidateEnd;
  }).map((item) => item.id);
}

export function normalizeSlug(value:string):string {
  return value.normalize('NFKC').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}
