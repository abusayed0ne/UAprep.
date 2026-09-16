export const ROLES = ['STUDENT','PATTERN_RESEARCHER','QUESTION_SETTER','SUBJECT_REVIEWER','ANSWER_VALIDATOR','FAIRNESS_REVIEWER','ACADEMIC_APPROVER','MOCK_MANAGER','ACADEMIC_DIRECTOR','SUPPORT_AGENT','FINANCE_ADMIN','OPERATIONS_ADMIN','SECURITY_ADMIN','TENANT_ADMIN','AUDITOR','PLATFORM_SUPER_ADMIN'] as const;
export type Role = (typeof ROLES)[number];
export const PERMISSIONS = ['university:read','university:manage','curriculum:read','curriculum:manage','evidence:read','evidence:create','evidence:approve','pattern:read','pattern:create','pattern:approve','pattern:publish','question:assign','question:create','question:read','question:review','question:fairness-review','question:rights-review','question:validate','question:approve','question:key:read','question:quarantine','mock:blueprint-manage','mock:create','mock:read','mock:validate','mock:publish','scoring:manage','attempt:create','attempt:read-own','commerce:manage','audit:read'] as const;
export type Permission = (typeof PERMISSIONS)[number];

const grants: Readonly<Record<Role, readonly Permission[]>> = {
  STUDENT:['university:read','curriculum:read','pattern:read','attempt:create','attempt:read-own'], PATTERN_RESEARCHER:['university:read','evidence:read','evidence:create','pattern:read','pattern:create'],
  QUESTION_SETTER:['question:create','question:read'], SUBJECT_REVIEWER:['question:read','question:review'], ANSWER_VALIDATOR:['question:read','question:validate'],
  FAIRNESS_REVIEWER:['question:read','question:fairness-review'], ACADEMIC_APPROVER:['question:read','question:approve','question:key:read','question:quarantine'],
  MOCK_MANAGER:['pattern:read','question:read','mock:create','mock:read','mock:validate','mock:publish'], ACADEMIC_DIRECTOR:['university:read','university:manage','curriculum:read','curriculum:manage','evidence:read','evidence:approve','pattern:read','pattern:create','pattern:approve','pattern:publish','question:assign','question:read','question:review','question:fairness-review','question:rights-review','question:validate','question:approve','question:key:read','question:quarantine','mock:blueprint-manage','mock:create','mock:read','mock:validate','mock:publish','scoring:manage'],
  SUPPORT_AGENT:[], FINANCE_ADMIN:['commerce:manage'], OPERATIONS_ADMIN:[], SECURITY_ADMIN:['audit:read'],
  TENANT_ADMIN:['university:read','curriculum:read','evidence:read','pattern:read'], AUDITOR:['university:read','curriculum:read','evidence:read','pattern:read','audit:read'], PLATFORM_SUPER_ADMIN:[],
};
export interface AuthorizationContext { actorId:string; tenantId:string; roles:readonly Role[]; resourceTenantId:string; ownerId?:string; activeExam?:boolean; breakGlass?:boolean; }
export function can(permission: Permission, context: AuthorizationContext): boolean {
  if (context.tenantId !== context.resourceTenantId) return false;
  if (context.roles.includes('PLATFORM_SUPER_ADMIN')) return context.breakGlass === true;
  if (!context.roles.some((role) => grants[role].includes(permission))) return false;
  if (permission === 'question:key:read' && context.activeExam === true) return false;
  if (permission === 'question:approve' && context.ownerId === context.actorId) return false;
  return true;
}
