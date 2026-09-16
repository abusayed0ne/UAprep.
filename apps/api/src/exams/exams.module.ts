import{Module}from'@nestjs/common';import{PermissionGuard}from'../authorization.js';import{ExamsController}from'./exams.controller.js';import{ExamsService}from'./exams.service.js';
@Module({controllers:[ExamsController],providers:[ExamsService,PermissionGuard]})export class ExamsModule{}
