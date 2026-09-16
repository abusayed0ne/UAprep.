import {Body,Controller,Get,Param,Post,UseGuards} from '@nestjs/common';
import {PermissionGuard,RequirePermission} from '../authorization.js';
import {AuthContext,type RequestContext} from '../request-context.js';
import {MocksService} from './mocks.service.js';

@Controller('mocks')
@UseGuards(PermissionGuard)
export class MocksController {
  constructor(private readonly service:MocksService){}
  @Post('blueprints') @RequirePermission('mock:blueprint-manage') blueprint(@AuthContext() ctx:RequestContext,@Body() body:unknown){return this.service.createBlueprint(ctx,body);}
  @Post() @RequirePermission('mock:create') create(@AuthContext() ctx:RequestContext,@Body() body:unknown){return this.service.createMock(ctx,body);}
  @Post(':id/versions') @RequirePermission('mock:create') version(@AuthContext() ctx:RequestContext,@Param('id') id:string,@Body() body:unknown){return this.service.createVersion(ctx,id,body);}
  @Get(':id') @RequirePermission('mock:read') get(@AuthContext() ctx:RequestContext,@Param('id') id:string){return this.service.get(ctx,id);}
  @Post(':id/validate') @RequirePermission('mock:validate') validate(@AuthContext() ctx:RequestContext,@Param('id') id:string){return this.service.validate(ctx,id);}
  @Post(':id/publish') @RequirePermission('mock:publish') publish(@AuthContext() ctx:RequestContext,@Param('id') id:string){return this.service.publish(ctx,id);}
}
