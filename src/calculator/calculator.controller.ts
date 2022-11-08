import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CalculatorHelper } from '../helper/CalculatorHelper';

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
  getSum(@Param('value1') value1: any, @Param('value2') value2: any): number {
    return CalculatorHelper.performSum(value1, value2);
  }

  @Get('product/:value1/:value2')
  @ApiResponse({
    status: 200,
    description: 'The product of two values',
  })
  getProduct(
    @Param('value1') value1: any,
    @Param('value2') value2: any,
  ): number {
    return CalculatorHelper.performProduct(value1, value2);
  }
}
