import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/createUser.command';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  // constructor(
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  //   private readonly eventBus: EventBus,
  // ) {}


  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { username } = command;

    // Create a new user using the repository
    return this.userRepository.create(username);
  }
}
