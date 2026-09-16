import {Module} from '@nestjs/common';
import {PermissionGuard} from '../authorization.js';
import {MocksController} from './mocks.controller.js';
import {MocksService} from './mocks.service.js';
@Module({controllers:[MocksController],providers:[MocksService,PermissionGuard]})
export class MocksModule {}
