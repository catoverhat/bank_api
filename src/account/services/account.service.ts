import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Account } from '../entities/account.entity';
import { TransactionService } from 'src/transactions/services/transactions.service';
import { InsufficientFundsException } from '../../exceptions/insufficientFunds.exception';
import { AccountDisableException } from 'src/exceptions/accountDisable.exception';
import { UserNotfound } from 'src/exceptions/userNotFound.exception';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private transactionService: TransactionService,
  ) {}

  async findOneUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUuid(uuid: string): Promise<Account> {
    return this.accountRepository.findOne({ where: { uuid } });
  }

  async updateByUuid(
    uuid: string,
    colunm: string,
    value: number | boolean,
  ): Promise<Account> {
    // TODO: the next implementation was used because update gave an error
    await this.accountRepository
      .createQueryBuilder()
      .update(Account)
      .set({ uuid, [colunm]: value })
      .where('uuid = :uuid', { uuid })
      .execute();

    //  await this.accountRepository.update(uuid, balance);
    return this.findOneByUuid(uuid);
  }

  async createAccount(
    id: number,
    accountData: Partial<Account>,
  ): Promise<Account> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotfound();
    }

    const newAccount = this.accountRepository.create(accountData);
    newAccount.user = user;

    await this.transactionService.saveTransactions({
      userId: user.id,
      accountFrom: newAccount.uuid,
      amount: newAccount.balance,
    });

    return this.accountRepository.save(newAccount);
  }

  async addBalance(userId: number, uuid: string, amount: number) {
    const accountFind = await this.findOneByUuid(uuid);
    if (accountFind.state === false) {
      throw new AccountDisableException();
    }

    const newBalance = accountFind.balance + amount;
    await this.transactionService.saveTransactions({
      userId: userId,
      accountFrom: accountFind.uuid,
      amount: amount,
    });

    return await this.updateByUuid(uuid, 'balance', newBalance);
  }

  async transferBalance(
    userId: number,
    uuidFrom: string,
    uuidTo: string,
    amount: number,
  ) {
    const accountFromFind = await this.findOneByUuid(uuidFrom);
    const accountToFind = await this.findOneByUuid(uuidTo);

    if (accountFromFind.state === false || accountToFind.state === false) {
      throw new AccountDisableException();
    }

    if (accountFromFind.balance < amount) {
      throw new InsufficientFundsException();
    }

    const newBalanceFrom = accountFromFind.balance - amount;
    await this.updateByUuid(uuidFrom, 'balance', newBalanceFrom);

    const newBalanceTo = accountToFind.balance + amount;
    this.transactionService.saveTransactions({
      userId: userId,
      accountFrom: accountFromFind.uuid,
      accountTo: accountToFind.uuid,
      amount: amount,
    });

    return await this.updateByUuid(uuidTo, 'balance', newBalanceTo);
  }

  async disableAccount(uuid: string) {
    const accountFind = await this.findOneByUuid(uuid);
    if (accountFind.state === false) {
      throw new AccountDisableException()
    }

    return await this.updateByUuid(uuid, 'state', false);
  }
}
