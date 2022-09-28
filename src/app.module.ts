import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorController } from './calculator/calculator.controller';
import { ReadFileController } from './read-file/read-file.controller';

@Module({
  imports: [],
  controllers: [AppController, CalculatorController, ReadFileController],
  providers: [AppService],
})
export class AppModule {}
