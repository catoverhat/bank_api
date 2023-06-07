import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
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

  async findOneByUserId(userId: number): Promise<Account> {
    return this.accountRepository.findOne({ where: { userId } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async updateByUuid(uuid: string, balance: any): Promise<Account> {
    // TODO: the next implementation was used because update gave an error
    await this.accountRepository
      .createQueryBuilder()
      .update(Account)
      .set({ uuid, balance })
      .where('uuid = :uuid', { uuid })
      .execute();
    //  await this.accountRepository.update(uuid, balance);
    return this.findOneByUuid(uuid);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
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

    return this.accountRepository.save(newAccount);
  }

  async addBalance(uuid: string, amount: number) {
    const accountFind = await this.findOneByUuid(uuid);
    if (accountFind.state === false) {
      return 'Account disable/close';
    } else {
      const newBalance = accountFind.balance + amount;
      return await this.updateByUuid(uuid, newBalance);
    }
  }

  async transferBalance(uuidFrom: string, uuidTo: string, amount: number) {
    const accountFromFind = await this.findOneByUuid(uuidFrom);
    const accountToFind = await this.findOneByUuid(uuidTo);
    if (accountFromFind.state === false || accountToFind.state === false) {
      return 'One or both accounts are disable';
    } else if (accountFromFind.balance <= 0) {
      return 'Not enough funds';
    } else {
      const newBalanceFrom = accountFromFind.balance - amount;
      await this.updateByUuid(uuidFrom, newBalanceFrom);
      const newBalanceTo = accountToFind.balance + amount;
      return await this.updateByUuid(uuidTo, newBalanceTo);
    }
  }

  async disableAccount(uuid: string, newState: boolean) {
    const accountFind = await this.findOneByUuid(uuid);
    if (accountFind.state === false) {
      return 'Account already disable/close';
    } else {
      accountFind.state = newState;
      return await this.updateByUuid(uuid, accountFind);
    }
  }

  async historyMovements(userId: number) {
    return await this.accountRepository.findOne({ where: { userId } })
  }
}
