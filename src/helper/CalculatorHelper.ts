import { HttpException, HttpStatus } from '@nestjs/common';

export class CalculatorHelper {
  public static performSum(value1: any, value2: any): number {
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
    return vl1 + vl2;
  }

  public static performProduct(value1: any, value2: any): number {
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
    return vl1 * vl2;
  }
}
