import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/impl/createUser.command';
import { User } from '../entities/user.entity';

@Controller('users')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() user: CreateUserCommand): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(user.username));
  }
}
