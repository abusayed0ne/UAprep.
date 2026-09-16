import { Module } from '@nestjs/common';
import { PermissionGuard } from '../authorization.js';
import { AcademicController } from './academic.controller.js';
import { AcademicService } from './academic.service.js';
@Module({controllers:[AcademicController],providers:[AcademicService,PermissionGuard]})
export class AcademicModule {}
