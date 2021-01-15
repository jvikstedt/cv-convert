import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConverterService } from './converter.service';
import { ConverterController } from './converter.controller';

@Module({
  imports: [AuthModule],
  controllers: [ConverterController],
  providers: [ConverterService],
})
export class ConverterModule {}
