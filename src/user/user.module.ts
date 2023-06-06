import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { Account } from '../account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
