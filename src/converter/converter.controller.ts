import * as fs from 'fs';
import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated } from 'src/authorization/authorization.decorator';
import { ConverterService } from './converter.service';

@ApiBearerAuth()
@ApiTags('convert')
@Controller('convert')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post()
  @Authenticated()
  @UseInterceptors(FileInterceptor('file', { dest: './files' }))
  async convert(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    const createdFile = await this.converterService.convert(file);

    res.download(createdFile.path, createdFile.name, () => {
      fs.unlinkSync(createdFile.path);
    });
  }
}
