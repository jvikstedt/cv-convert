import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConverterModule } from './converter/converter.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, HealthModule, ConverterModule],
})
export class AppModule {}
