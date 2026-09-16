import{Body,Controller,Get,Param,Post,Put,UseGuards}from'@nestjs/common';import{PermissionGuard,RequirePermission}from'../authorization.js';import{AuthContext,type RequestContext}from'../request-context.js';import{ExamsService}from'./exams.service.js';
@Controller('exams')@UseGuards(PermissionGuard)export class ExamsController{constructor(private readonly service:ExamsService){}
@Post('scoring-policies')@RequirePermission('scoring:manage')policy(@AuthContext()ctx:RequestContext,@Body()body:unknown){return this.service.createScoringPolicy(ctx,body);}
@Post('targets')@RequirePermission('attempt:create')target(@AuthContext()ctx:RequestContext,@Body()body:unknown){return this.service.setTarget(ctx,body);}
@Get('library')@RequirePermission('attempt:create')library(@AuthContext()ctx:RequestContext){return this.service.library(ctx);}
@Post('attempts')@RequirePermission('attempt:create')start(@AuthContext()ctx:RequestContext,@Body()body:unknown){return this.service.start(ctx,body);}
@Get('attempts/:id')@RequirePermission('attempt:read-own')attempt(@AuthContext()ctx:RequestContext,@Param('id')id:string){return this.service.examPayload(ctx,id);}
@Put('attempts/:id/answers')@RequirePermission('attempt:create')save(@AuthContext()ctx:RequestContext,@Param('id')id:string,@Body()body:unknown){return this.service.save(ctx,id,body);}
@Post('attempts/:id/submit')@RequirePermission('attempt:create')submit(@AuthContext()ctx:RequestContext,@Param('id')id:string){return this.service.submit(ctx,id);}}
