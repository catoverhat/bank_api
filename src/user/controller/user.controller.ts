import { Controller, Post, Body, Get, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}
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
  // @Post()
  // async create(@Body() user: User): Promise<User> {
  //   return this.usersService.create(user);
  // }

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

  //  // Create an account for a user
  //  @Post(':id/accounts') // Use the route '/users/:id/accounts' to create an account for a specific user
  //  async createAccount(@Param('id') userId: number, @Body() accountData: any): Promise<User> {
  //    const user = await this.usersService.findOne(userId);
  //    if (!user) {
  //      throw new NotFoundException('User does not exist!');
  //    }
 
  //     // Create the account and associate it with the user
  //   const createdAccount = await this.usersService.createAccount(userId, accountData);

  //   // Update the user object with the created account
  //   user.accounts.push(createdAccount);

  //   // Return the updated user object
  //   return user;
  //  }
}
