import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';

@Controller('read-file')
export class ReadFileController {

  @Get('testing')
  @ApiResponse({
  status: 200,
  description: 'Just a test',
  })
  testing(): string {
    return "OK";
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 201,
    description: 'Uploads and process a csv file',
  })
  processFile(@UploadedFile() file: Express.Multer.File): string {
    console.log(file);
    return "OK";
  }
}
