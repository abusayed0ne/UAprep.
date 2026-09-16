import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { can, type Permission, type Role } from '@uaprep/permissions';
import type { RequestContext } from './request-context.js';

const PERMISSION_KEY = 'required_permission';
export const RequirePermission = (permission:Permission) => SetMetadata(PERMISSION_KEY, permission);

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector:Reflector) {}
  canActivate(context:ExecutionContext):boolean {
    const permission = this.reflector.getAllAndOverride<Permission>(PERMISSION_KEY,[context.getHandler(),context.getClass()]);
    if (!permission) return true;
    const request = context.switchToHttp().getRequest<{authContext?:RequestContext}>();
    if (!request.authContext) throw new UnauthorizedException();
    const principal = request.authContext.principal;
    if (!can(permission,{actorId:principal.userId,tenantId:principal.tenantId,resourceTenantId:principal.tenantId,roles:principal.roles as readonly Role[]})) throw new ForbiddenException();
    return true;
  }
}
