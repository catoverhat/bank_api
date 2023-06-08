import { Controller, Post,Param, Put, Body, NotFoundException } from '@nestjs/common';
import { AccountService } from '../../account/services/account.service';
import { Account } from '../entities/account.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller('user')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Create an account for a user
  @Post(':id/accounts')
  async createAccount(
    @Param('id') userId: number,
    @Body() accountData: any,
  ): Promise<Account> {
    const user = await this.accountService.findOneUser(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    const accountWithUuid = { ...accountData, uuid: uuidv4() };
    // Create the account and associate it with the user
    const createdAccount = await this.accountService.createAccount(
      userId,
      accountWithUuid,
    );
    return createdAccount;
  }

   //Add balance
   @Put(':id/accounts/add')
   async addBalance(@Param('id') id: number, @Body() balanceData: any) {
     return await this.accountService.addBalance(
       id,
       balanceData.uuid,
       balanceData.amount,
     );
   }

   
  // Transfer balance
  @Put(':id/accounts/transfer')
  async transferBalance(@Param('id') id: number, @Body() balanceData: any) {
    return await this.accountService.transferBalance(
      id,
      balanceData.uuidFrom,
      balanceData.uuidTo,
      balanceData.amount,
    );
  }

  // Disable account
  @Put(':id/account/state')
  async disableAccount(@Param('id') id: number, @Body() accountState: any) {
    return await this.accountService.disableAccount(accountState.uuid);
  }
}
