import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountDisableException extends HttpException {
  constructor() {
    super('One or both accounts are disable', HttpStatus.BAD_REQUEST);
  }
}