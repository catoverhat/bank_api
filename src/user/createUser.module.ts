import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserController } from './controller/createUser.controller';
import { CreateUserHandler } from './commands/handlers/createUser.handler';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [CreateUserHandler],
  controllers: [CreateUserController],
})
export class createUserModule {}
