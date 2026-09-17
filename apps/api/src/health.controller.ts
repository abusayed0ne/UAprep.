import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { database } from '@uaprep/db';
@Controller('health')
export class HealthController {
  @Get('live') live() { return { status:'ok' as const }; }
  @Get('ready') async ready() {
    try {
      await database.$queryRaw`SELECT 1`;
      return { status:'ok' as const, checks:{ application:true, database:true } };
    } catch {
      throw new ServiceUnavailableException({ status:'unavailable', checks:{ application:true, database:false } });
    }
  }
}
