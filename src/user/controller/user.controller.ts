import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
//   constructor(private readonly usersService: UserService) {}

//   //create user
//   @Post()
//   async create(@Body() user: User): Promise<User> {
//     const createdUser = await this.usersService.create(user.username);
//     return this.usersService.findOne(createdUser.id);
//   }
}
