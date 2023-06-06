import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controller/account.controller';
import { AccountService } from './services/account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
