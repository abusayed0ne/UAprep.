import { ForbiddenException, UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { describe, expect, it } from 'vitest';
import type { Permission } from '@uaprep/permissions';
import { PermissionGuard } from './authorization.js';
import type { RequestContext } from './request-context.js';

function guardFor(permission:Permission) {
  const reflector = { getAllAndOverride:() => permission } as unknown as Reflector;
  return new PermissionGuard(reflector);
}

function executionContext(authContext?:RequestContext):ExecutionContext {
  const request = {
    authContext,
    headers:{ 'x-roles':'ACADEMIC_DIRECTOR', 'x-tenant-id':'attacker-tenant' },
  };
  return {
    switchToHttp:() => ({ getRequest:() => request }),
    getHandler:() => function handler(){},
    getClass:() => class Controller {},
  } as unknown as ExecutionContext;
}

const student:RequestContext = {
  correlationId:'test-request',
  principal:{ userId:'student-1', tenantId:'tenant-1', roles:['STUDENT'] },
};

describe('PermissionGuard', () => {
  it('rejects a request without a verified auth context', () => {
    expect(() => guardFor('university:read').canActivate(executionContext())).toThrow(UnauthorizedException);
  });

  it('allows a student permission granted by the database-backed context', () => {
    expect(guardFor('university:read').canActivate(executionContext(student))).toBe(true);
  });

  it('denies an academic write to a student', () => {
    expect(() => guardFor('university:manage').canActivate(executionContext(student))).toThrow(ForbiddenException);
  });

  it('ignores attacker-controlled role and tenant headers', () => {
    expect(() => guardFor('university:manage').canActivate(executionContext(student))).toThrow(ForbiddenException);
  });
});
