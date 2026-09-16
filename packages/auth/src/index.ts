export interface AuthenticatedPrincipal { userId:string; sessionId:string; tenantId:string; roles:readonly string[]; mfaVerified:boolean; }
export interface SessionStore { findByOpaqueTokenHash(hash:string):Promise<AuthenticatedPrincipal|null>; revoke(sessionId:string, reason:string):Promise<void>; }
export function requireStaffMfa(principal:AuthenticatedPrincipal):void { if (!principal.mfaVerified) throw new Error('Staff MFA verification required'); }
