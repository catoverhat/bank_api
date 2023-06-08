import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from '../entities/transactions.entity';

@Injectable()
export class TransactionService {
  @InjectRepository(Transactions)
  private transactionsRepository: Repository<Transactions>;

  async findAllByUserId(userId: number): Promise<Transactions[]> {
    const transactions = await this.transactionsRepository.find({
      where: { userId },
    });
    if (transactions.length === 0) {
      throw new NotFoundException('No transactions found for the user!');
    }

    return transactions;
  }

  async saveTransactions(
    transactions: Partial<Transactions>,
  ): Promise<Transactions> {
    const log = this.transactionsRepository.create(transactions);
    return this.transactionsRepository.save(log);
  }

  async transactionHistory(userId: number) {
    const userLog = this.findAllByUserId(userId);
    if (!userLog) {
      throw new NotFoundException('User does not exist!');
    }
    return userLog;
  }
}
