import { Module } from '@nestjs/common';
import { PermissionGuard } from '../authorization.js';
import { QuestionsController } from './questions.controller.js';
import { QuestionsService } from './questions.service.js';
@Module({controllers:[QuestionsController],providers:[QuestionsService,PermissionGuard]})
export class QuestionsModule {}
