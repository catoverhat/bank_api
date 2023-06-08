import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/createUser.command';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  // constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { username } = command;

    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new HttpException('Username is already taken', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create({ username });
    return this.userRepository.save(newUser);
  }
}
