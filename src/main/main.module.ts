import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserService } from '../user/services/user.service';
import { UserController } from '../user/controller/user.controller';
import { User } from '../user/entities/user.entity';
import { AccountService } from 'src/account/services/account.service';
import { AccountController } from 'src/account/controller/account.controller';
import { Account } from '../account/entities/account.entity';
import { TransactionService } from '../transactions/services/transactions.service';
import { TransactionController } from '../transactions/controller/transaction.controller';
import { Transactions } from 'src/transactions/entities/transactions.entity';
import { CreateUserHandler } from 'src/user/commands/handlers/createUser.handler';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateUserController } from 'src/user/controller/createUser.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Transactions]),CqrsModule],
  providers: [UserService, AccountService, TransactionService, CreateUserHandler, UserRepository],
  controllers: [UserController, AccountController, TransactionController, CreateUserController],
})
export class MainModule {}
