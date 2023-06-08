import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Transactions } from '../entities/transactions.entity';
import { TransactionService } from '../services/transactions.service';

@Controller('user')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':userId/transactions')
  async transactionHistory(@Param('userId') userId: number): Promise<Transactions[]> {
    const user = await this.transactionService.findAllByUserId(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }
}
