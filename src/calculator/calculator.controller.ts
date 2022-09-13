import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('calculator')
export class CalculatorController {
  @Get()
  getHello(): string {
    return 'This is an API Calculator!';
  }

  @Get('sum/:value1/:value2')
  @ApiResponse({
    status: 200,
    description: 'The sum of two values',
  })
  getSum(
    @Param('value1') value1: number,
    @Param('value2') value2: number,
  ): number {
    const vl1 = Number(value1);
    const vl2 = Number(value2);
    if (Number.isNaN(vl1)) {
      throw new HttpException(
        value1 + ' is not a number!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (Number.isNaN(vl2)) {
      throw new HttpException(
        value2 + ' is not a number!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result: number = vl1 + vl2;
    return result;
  }

  @Get('product/:value1/:value2')
  @ApiResponse({
    status: 200,
    description: 'The product of two values',
  })
  getProduct(
    @Param('value1') value1: number,
    @Param('value2') value2: number,
  ): number {
    const vl1 = Number(value1);
    const vl2 = Number(value2);
    if (Number.isNaN(vl1)) {
      throw new HttpException(
        value1 + ' is not a number!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (Number.isNaN(vl2)) {
      throw new HttpException(
        value2 + ' is not a number!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result: number = vl1 * vl2;
    return result;
  }
}
