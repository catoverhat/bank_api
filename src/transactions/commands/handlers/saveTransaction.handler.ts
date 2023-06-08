import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveTransactionCommand } from '../impl/SaveTransaction.command';
import { Transactions } from '../../entities/transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(SaveTransactionCommand)
export class SaveTransactionHandler
  implements ICommandHandler<SaveTransactionCommand>
{
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionsRepository: Repository<Transactions>,
  ) {}

  async execute(command: SaveTransactionCommand): Promise<Transactions> {
    const { transactions } = command;

    const log = this.transactionsRepository.create(transactions);
    return this.transactionsRepository.save(log);
  }
}
