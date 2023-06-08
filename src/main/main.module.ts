import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CqrsModule } from '@nestjs/cqrs';
import { UserService } from '../user/services/user.service';
import { UserController } from '../user/controller/user.controller';
import { User } from '../user/entities/user.entity';
import { AccountService } from 'src/account/services/account.service';
import { AccountController } from 'src/account/controller/account.controller';
import { Account } from '../account/entities/account.entity';
import { TransactionService } from '../transactions/services/transactions.service';
import { TransactionController } from '../transactions/controller/transaction.controller';
import { Transactions } from 'src/transactions/entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Transactions])],
  providers: [UserService, AccountService, TransactionService],
  controllers: [UserController, AccountController, TransactionController],
})
export class MainModule {}
