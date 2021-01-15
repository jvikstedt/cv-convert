import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.guard';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Get()
  @Public()
  @HealthCheck()
  readiness(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
