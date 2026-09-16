import { describe, expect, it } from 'vitest';
import { can, type AuthorizationContext } from './index.js';
const ctx: AuthorizationContext = { actorId:'a',tenantId:'t1',resourceTenantId:'t1',roles:['ACADEMIC_APPROVER'] };
describe('deny-by-default authorization', () => {
  it('tenant_a_cannot_fetch_tenant_b_data', () => expect(can('question:key:read',{...ctx,resourceTenantId:'t2'})).toBe(false));
  it('setter_cannot_approve_own_question', () => expect(can('question:approve',{...ctx,ownerId:'a'})).toBe(false));
  it('active exam keys are unavailable', () => expect(can('question:key:read',{...ctx,activeExam:true})).toBe(false));
  it('super admin requires break glass', () => expect(can('audit:read',{...ctx,roles:['PLATFORM_SUPER_ADMIN']})).toBe(false));
});
