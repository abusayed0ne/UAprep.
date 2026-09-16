import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
export interface RequestContext { correlationId:string; principal:{ userId:string; tenantId:string; roles:readonly string[] } }
export const AuthContext = createParamDecorator((_data:unknown, context:ExecutionContext):RequestContext => {
  const request = context.switchToHttp().getRequest<{ authContext?:RequestContext }>();
  if (!request.authContext) throw new UnauthorizedException();
  return request.authContext;
});
