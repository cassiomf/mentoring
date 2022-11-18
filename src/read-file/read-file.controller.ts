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
import { CalculatorHelper } from '../helper/CalculatorHelper';

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
    const fileContent = file.buffer.toString('utf8');

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
        result.forEach((row) => {
          console.log('linha: ', row);
          if (row.Operation === 'SUM') {
            console.log('É uma soma!');
            const sum = CalculatorHelper.performSum(row.Value1, row.Value2);
            console.log(sum);
          } else if (row.Operation === 'PRODUCT') {
            console.log('É um produto!');
          }
        });
        console.log('Result', result);
      },
    );
    return {
      file: file.buffer.toString(),
    };
  }
}
