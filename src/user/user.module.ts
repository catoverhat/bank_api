import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entity';
// import { User } from './entities/user';
import { Account } from '../account/entities/account.entity';
import { Transactions } from 'src/transactions/transactions.entity';
// import { GetUserHandler } from './queries/handlers/get-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Transactions])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
