import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientFundsException extends HttpException {
  constructor() {
    super('Not enough funds', HttpStatus.BAD_REQUEST);
  }
}
