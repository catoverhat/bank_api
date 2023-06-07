import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // @Post(':user')
  // createAccount(@Body() body:any){
  //   return body
  // }

  // @Get(':user/accounts')
  // getAccounts() {
  //   return ['acc1, acc2'];
  // }
  
  // @Get(':user/:account')
  // getAccount() {
  //   return ['acc1'];
  // }

  // @Put(':user/:account/add')
  // addBalance(@Param('user') user:string, @Param('account') account:string, @Body() body:any){
  //   return body
  // }

  // @Put(':user/:account/transfer')
  // tranferMoney(){
  //   return 'money transfered'
  // }

  // @Put(':user/:account/disable')
  // disableAccount(){
  //   return 'account disable'
  // }
  
  // @Delete(':user/accounts/close')
  // accountClosed(@Param('user') user:string){
  //   return 'account closed'
  // }

}
