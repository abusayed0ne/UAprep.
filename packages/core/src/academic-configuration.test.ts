import { describe, expect, it } from 'vitest';
import { findOverlappingPatternIds, normalizeSlug, validatePatternPublication } from './academic-configuration.js';
const valid = { evidence:[{id:'e1',tier:'A_OFFICIAL_CURRENT' as const,status:'APPROVED' as const}], programIds:['p1'], effectiveFrom:new Date('2026-01-01'), sections:[{position:1,name:'Demo',questionType:'SINGLE_CHOICE',questionCount:10,marks:10,durationSeconds:600,wrongPenalty:0}] };
describe('academic configuration', () => {
  it('tier_d_never_authorizes_pattern_publication', () => expect(validatePatternPublication({...valid,evidence:[{id:'e',tier:'D_RESEARCH_LEAD',status:'APPROVED'}]},new Date('2025-01-01')).map(x=>x.code)).toContain('APPROVED_EVIDENCE_REQUIRED'));
  it('rejects an invalid section configuration', () => expect(validatePatternPublication({...valid,sections:[{...valid.sections[0]!,questionCount:0}]},new Date('2025-01-01')).map(x=>x.code)).toContain('INVALID_QUESTION_COUNT'));
  it('detects overlapping program-effective ranges', () => expect(findOverlappingPatternIds({id:'new',effectiveFrom:new Date('2026-02-01'),programIds:['p1']},[{id:'old',effectiveFrom:new Date('2026-01-01'),effectiveUntil:new Date('2026-03-01'),programIds:['p1']}])).toEqual(['old']));
  it('normalizes stable slugs', () => expect(normalizeSlug('  Higher Mathematics ')).toBe('higher-mathematics'));
});
