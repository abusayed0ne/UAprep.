import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { loadConfig } from './config.js';
async function bootstrap() {
  const config = loadConfig();
  const app = await NestFactory.create(AppModule, { cors:false });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors({
    origin:(origin:string|undefined, callback:(error:Error|null, allow?:boolean)=>void) =>
      callback(null, !origin || origin === config.WEB_ORIGIN),
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist:true, forbidNonWhitelisted:true, transform:true }));
  app.setGlobalPrefix('v1');
  await app.listen(config.API_PORT, '0.0.0.0');
}
void bootstrap();
