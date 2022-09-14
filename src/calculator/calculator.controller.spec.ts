import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';

describe('CalculatorController', () => {
  let controller: CalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 5 when adding 2 and 3', () => {
    const result = controller.getSum(2, 3);
    expect(result).toBe(5);
  });
  
  it('should return 42 when multiplying 6 and 7', () => {
    const result = controller.getProduct(6, 7);
    expect(result).toBe(42);
  });

  it('should throw an error when adding r and 3', () => {
    expect(() => {
      controller.getSum('r', 3)
    }).toThrow(HttpException);
  });

  it('should throw an error when adding 2 and s', () => {
    expect(() => {
      controller.getSum(2, 's')
    }).toThrow(HttpException);
  });
});