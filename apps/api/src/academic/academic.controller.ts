import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PermissionGuard, RequirePermission } from '../authorization.js';
import { AuthContext, type RequestContext } from '../request-context.js';
import { AcademicService } from './academic.service.js';

@Controller('academic')
@UseGuards(PermissionGuard)
export class AcademicController {
  constructor(private readonly service:AcademicService) {}
  @Get('universities') @RequirePermission('university:read') universities(@AuthContext() ctx:RequestContext){return this.service.listUniversities(ctx);}
  @Post('universities') @RequirePermission('university:manage') createUniversity(@AuthContext() ctx:RequestContext,@Body() body:unknown){return this.service.createUniversity(ctx,body);}
  @Post('universities/:id/programs') @RequirePermission('university:manage') createProgram(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createProgram(ctx,id,body);}
  @Post('universities/:id/evidence') @RequirePermission('evidence:create') createEvidence(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createEvidence(ctx,id,body);}
  @Patch('evidence/:id/approve') @RequirePermission('evidence:approve') approveEvidence(@AuthContext() ctx:RequestContext,@Param('id') id:string){return this.service.approveEvidence(ctx,id);}
  @Post('subjects') @RequirePermission('curriculum:manage') createSubject(@AuthContext() ctx:RequestContext,@Body() body:unknown){return this.service.createSubject(ctx,body);}
  @Post('subjects/:id/topics') @RequirePermission('curriculum:manage') createTopic(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createTopic(ctx,id,body);}
  @Post('topics/:id/subtopics') @RequirePermission('curriculum:manage') createSubtopic(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createSubtopic(ctx,id,body);}
  @Post('topics/:id/objectives') @RequirePermission('curriculum:manage') createObjective(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createObjective(ctx,id,body);}
  @Post('universities/:id/patterns') @RequirePermission('pattern:create') createPattern(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createPattern(ctx,id,body);}
  @Post('patterns/:id/versions') @RequirePermission('pattern:create') createVersion(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createPatternVersion(ctx,id,body);}
  @Patch('pattern-versions/:id/transition') @RequirePermission('pattern:approve') transition(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.transitionPattern(ctx,id,body);}
}
