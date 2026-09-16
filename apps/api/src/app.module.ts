import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { AcademicModule } from './academic/academic.module.js';
import { QuestionsModule } from './questions/questions.module.js';
import { MocksModule } from './mocks/mocks.module.js';
import { ExamsModule } from './exams/exams.module.js';
import { ResultsModule } from './results/results.module.js';
import { CommerceModule } from './commerce/commerce.module.js';
import { SecurityMiddleware } from './security.middleware.js';
@Module({ imports:[AcademicModule,QuestionsModule,MocksModule,ExamsModule,ResultsModule,CommerceModule], controllers:[HealthController] })
export class AppModule implements NestModule { configure(consumer:MiddlewareConsumer){consumer.apply(SecurityMiddleware).forRoutes('*');} }
