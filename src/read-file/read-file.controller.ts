import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { parse } from 'csv-parse';
import * as fs from 'fs';

@Controller('read-file')
export class ReadFileController {
  @Get('testing')
  @ApiResponse({
    status: 200,
    description: 'Just a test',
  })
  testing(): string {
    return 'OK';
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 201,
    description: 'Uploads and process a csv file',
  })
  uploadFileAndPassValidation(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .addMaxSizeValidator({
          maxSize: 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const headers = ['Operation', 'Value1', 'Value2'];
    console.log('file: ', file);
    const fileContent = fs.readFileSync(file.buffer, { encoding: 'utf-8' });
    parse(
      fileContent,
      {
        delimiter: ';',
        columns: headers,
      },
      (error, result: any[]) => {
        if (error) {
          console.error(error);
        }
        console.log('Result', result);
      },
    );
    return {
      file: file.buffer.toString(),
    };
  }
}
