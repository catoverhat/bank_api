import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Account } from 'src/account/entities/account.entity';
import { Transactions } from 'src/transactions/transactions.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUuid(uuid: string): Promise<Account> {
    return this.accountRepository.findOne({ where: { uuid } });
  }

  async findAllByUserId(userId: number) {
    return this.transactionsRepository.find({ where: { userId } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
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

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveTransactions(
    transactions: Partial<Transactions>,
  ): Promise<Transactions> {
    const log = await this.transactionsRepository.create(transactions);
    return this.transactionsRepository.save(log);
  }

  async createAccount(
    id: number,
    accountData: Partial<Account>,
  ): Promise<Account> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    const newAccount = this.accountRepository.create(accountData);
    newAccount.user = user;
    this.saveTransactions({
      userId: user.id,
      accountFrom: newAccount.uuid,
      amount: newAccount.balance,
    });
    return this.accountRepository.save(newAccount);
  }

  async addBalance(userId: number, uuid: string, amount: number) {
    const accountFind = await this.findOneByUuid(uuid);
    if (accountFind.state === false) {
      return 'Account disable/close';
    } else {
      const newBalance = accountFind.balance + amount;
      this.saveTransactions({
        userId: userId,
        accountFrom: accountFind.uuid,
        amount: amount,
      });
      return await this.updateByUuid(uuid, 'balance', newBalance);
    }
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
      return 'One or both accounts are disable';
    } else if (accountFromFind.balance <= 0) {
      return 'Not enough funds';
    } else {
      const newBalanceFrom = accountFromFind.balance - amount;
      await this.updateByUuid(uuidFrom, 'balance', newBalanceFrom);
      const newBalanceTo = accountToFind.balance + amount;
      this.saveTransactions({
        userId: userId,
        accountFrom: accountFromFind.uuid,
        accountTo: accountToFind.uuid,
        amount: amount,
      });
      return await this.updateByUuid(uuidTo, 'balance', newBalanceTo);
    }
  }

  async disableAccount(uuid: string) {
    const accountFind = await this.findOneByUuid(uuid);
    if (accountFind.state === false) {
      return 'Account already disable/close';
    } else {
      return await this.updateByUuid(uuid, 'state', false);
    }
  }

  async transactionHistory(userId: number) {
    const userLog = this.findAllByUserId(userId);
    if (!userLog) {
      throw new NotFoundException('User does not exist!');
    }
    return userLog;
  }
}
