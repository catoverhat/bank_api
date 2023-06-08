import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Account } from 'src/account/entities/account.entity';
import { Transactions } from 'src/transactions/transactions.entity';
// import { QueryBus } from '@nestjs/cqrs';
// import { GetUserQuery } from '../queries/impl/get-user.query';
import { v4 as uuidv4 } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // constructor(private readonly queryBus: QueryBus) {}

  // @Get('all')
  // async getAll() {
  //   return await this.queryBus.execute(new GetUserQuery());
  // }
  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    const createdUser = await this.usersService.create(user);

    return this.usersService.findOne(createdUser.id);
  }

  //update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    await this.usersService.update(id, user);
    return this.usersService.findOne(id);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    await this.usersService.delete(id);
  }

  // Create an account for a user
  @Post(':id/accounts') // Use the route '/users/:id/accounts' to create an account for a specific user
  async createAccount(
    @Param('id') userId: number,
    @Body() accountData: any,
  ): Promise<Account> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    const accountWithUuid = { ...accountData, uuid: uuidv4() };
    // Create the account and associate it with the user
    const createdAccount = await this.usersService.createAccount(
      userId,
      accountWithUuid,
    );
    return createdAccount;
  }

  //Add balance
  @Put(':id/accounts/add')
  async addBalance(@Param('id') id: number, @Body() balanceData: any) {
    return await this.usersService.addBalance(
      id,
      balanceData.uuid,
      balanceData.amount,
    );
  }

  // Transfer balance
  @Put(':id/accounts/transfer')
  async transferBalance(@Param('id') id: number, @Body() balanceData: any) {
    return await this.usersService.transferBalance(
      id,
      balanceData.uuidFrom,
      balanceData.uuidTo,
      balanceData.amount,
    );
  }

  // Disable account
  @Put(':id/account/state')
  async disableAccount(@Param('id') id: number, @Body() accountState: any) {
    return await this.usersService.disableAccount(accountState.uuid);
  }

  @Get(':id/transactions')
  async transactionHistory(@Param('id') id: number, userId: number) {
    const user = await this.usersService.findAllByUserId(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }
}
