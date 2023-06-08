import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
// import { QueryBus } from '@nestjs/cqrs';
// import { GetUserQuery } from '../queries/impl/get-user.query';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // constructor(private readonly queryBus: QueryBus) {}

  //create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    const createdUser = await this.usersService.create(user.username);
    return this.usersService.findOne(createdUser.id);
  }
}
