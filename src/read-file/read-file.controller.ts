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
import { ResultDataDTO } from './dto/ResultDataDTO';

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
    const resultData: ResultDataDTO[] = this.test(file);
    return resultData;
  }

  private test(file: Express.Multer.File): ResultDataDTO[] {

    const headers = ['Operation', 'Value1', 'Value2'];
    const fileContent = file.buffer.toString();

    let resultData: ResultDataDTO[] = new Array<ResultDataDTO>();

    parse(
      fileContent,
      {
        delimiter: ';',
        columns: headers,
      },
      (error, result: any[]) => {
        for(const row of result) {
          if (row.Operation === 'SUM') {
            const sum = CalculatorHelper.performSum(row.Value1, row.Value2);
            resultData.push({
              operation: 'SUM',
              result: sum,
            });
          } else if (row.Operation === 'PRODUCT') {
            const product = CalculatorHelper.performProduct(
              row.Value1,
              row.Value2,
            );
            resultData.push({
              operation: 'PRODUCT',
              result: product,
            });
          }
        }
        return resultData;
      },
    );

    return resultData;
  }
}
