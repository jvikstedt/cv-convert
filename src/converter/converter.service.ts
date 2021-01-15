import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

export interface ConvertedFile {
  path: string;
  name: string;
}

@Injectable()
export class ConverterService {
  async convert(file: Express.Multer.File): Promise<ConvertedFile> {
    const promise = new Promise<ConvertedFile>((resolve, reject) => {
      exec(
        `libreoffice --headless --convert-to pdf ./files/${file.filename} --outdir ./files`,
        (error: Error | null): void => {
          if (error !== null) {
            reject(error);
          } else {
            fs.unlinkSync(`./files/${file.filename}`);

            resolve({
              path: `./files/${file.filename}.pdf`,
              name: file.originalname,
            });
          }
        },
      );
    });

    return promise;
  }
}
