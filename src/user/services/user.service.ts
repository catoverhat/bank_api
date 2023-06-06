import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
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

  async create(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // async createAccount(
  //   id: number,
  //   accountData: Partial<Account>,
  // ): Promise<Account> {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   if (!user) {
  //     throw new NotFoundException('User does not exist!');
  //   }

  //   const newAccount = this.accountRepository.create(accountData);
  //   newAccount.user = user;

  //   return this.accountRepository.save(newAccount);
  // }
}
