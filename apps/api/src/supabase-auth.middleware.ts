import { Injectable, type NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { database } from '@uaprep/db';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { loadConfig } from './config.js';
import type { RequestContext } from './request-context.js';

interface RequestLike {
  header(name:string):string|undefined;
  correlationId?:string;
  authContext?:RequestContext;
}

@Injectable()
export class SupabaseAuthMiddleware implements NestMiddleware {
  private readonly config = loadConfig();
  private readonly issuer = `${this.config.SUPABASE_URL.replace(/\/$/, '')}/auth/v1`;
  private readonly jwks = createRemoteJWKSet(new URL(`${this.issuer}/.well-known/jwks.json`));

  async use(request:RequestLike, _response:unknown, next:()=>void) {
    const authorization = request.header('authorization');
    if (!authorization) return next();
    const match = /^Bearer\s+(.+)$/i.exec(authorization);
    if (!match) throw new UnauthorizedException('Malformed bearer token');

    try {
      const { payload } = await jwtVerify(match[1]!, this.jwks, {
        issuer:this.issuer,
        audience:'authenticated',
      });
      if (!payload.sub || typeof payload.email !== 'string') throw new UnauthorizedException('Token identity is incomplete');
      const subject = payload.sub;
      const email = payload.email;

      const principal = await database.$transaction(async tx => {
        const tenant = await tx.tenant.upsert({
          where:{ slug:this.config.DEFAULT_TENANT_SLUG },
          create:{ slug:this.config.DEFAULT_TENANT_SLUG, name:'UAprep' },
          update:{},
        });
        let user = await tx.user.findUnique({
          where:{ authProvider_authSubject:{ authProvider:'supabase', authSubject:subject } },
        });
        if (!user) {
          const byEmail = await tx.user.findUnique({ where:{ email } });
          user = byEmail
            ? await tx.user.update({ where:{ id:byEmail.id }, data:{ authProvider:'supabase', authSubject:subject } })
            : await tx.user.create({ data:{ email, authProvider:'supabase', authSubject:subject } });
        }
        if (user.status !== 'ACTIVE') throw new UnauthorizedException('User account is not active');
        await tx.tenantMembership.upsert({
          where:{ tenantId_userId:{ tenantId:tenant.id, userId:user.id } },
          create:{ tenantId:tenant.id, userId:user.id },
          update:{},
        });
        const existingRole = await tx.roleBinding.findUnique({
          where:{ userId_tenantId_role:{ userId:user.id, tenantId:tenant.id, role:'STUDENT' } },
        });
        if (!existingRole) await tx.roleBinding.create({ data:{ userId:user.id, tenantId:tenant.id, role:'STUDENT' } });
        const roles = await tx.roleBinding.findMany({ where:{ userId:user.id, tenantId:tenant.id }, select:{ role:true } });
        return { userId:user.id, tenantId:tenant.id, roles:roles.map(item => item.role) };
      });
      request.authContext = {
        correlationId:request.correlationId ?? 'missing-correlation-id',
        principal,
      };
      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid or expired bearer token');
    }
  }
}
