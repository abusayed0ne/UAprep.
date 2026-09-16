import { Body,Controller,Get,Param,Patch,Post,UseGuards } from '@nestjs/common';
import { PermissionGuard,RequirePermission } from '../authorization.js';
import { AuthContext,type RequestContext } from '../request-context.js';
import { QuestionsService } from './questions.service.js';

@Controller('questions')
@UseGuards(PermissionGuard)
export class QuestionsController {
  constructor(private readonly service:QuestionsService){}
  @Post('content-sources') @RequirePermission('question:rights-review') source(@AuthContext() ctx:RequestContext,@Body() body:unknown){return this.service.createContentSource(ctx,body);}
  @Post('assignments') @RequirePermission('question:assign') assignment(@AuthContext() ctx:RequestContext,@Body() body:unknown){return this.service.createAssignment(ctx,body);}
  @Post() @RequirePermission('question:create') create(@AuthContext() ctx:RequestContext,@Body() body:unknown){return this.service.createQuestion(ctx,body);}
  @Post(':id/revisions') @RequirePermission('question:create') revision(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createRevision(ctx,id,body);}
  @Get('production') @RequirePermission('question:read') production(@AuthContext() ctx:RequestContext){return this.service.listProduction(ctx);}
  @Get(':id') @RequirePermission('question:read') get(@AuthContext() ctx:RequestContext,@Param('id') id:string){return this.service.getQuestion(ctx,id,false);}
  @Get(':id/with-key') @RequirePermission('question:key:read') getWithKey(@AuthContext() ctx:RequestContext,@Param('id') id:string){return this.service.getQuestion(ctx,id,true);}
  @Post(':id/reviews/sme') @RequirePermission('question:review') sme(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.recordReview(ctx,id,'SME',body);}
  @Post(':id/reviews/fairness') @RequirePermission('question:fairness-review') fairness(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.recordReview(ctx,id,'FAIRNESS',body);}
  @Post(':id/answer-validations') @RequirePermission('question:validate') validate(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.validateAnswer(ctx,id,body);}
  @Post(':id/rights-reviews') @RequirePermission('question:rights-review') rights(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.reviewRights(ctx,id,body);}
  @Post(':id/approvals') @RequirePermission('question:approve') approve(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.approve(ctx,id,body);}
  @Patch(':id/transition') @RequirePermission('question:read') transition(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.transition(ctx,id,body);}
}
