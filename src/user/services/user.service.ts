import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserNotfound } from 'src/exceptions/userNotFound.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotfound();
    }
    return user;
  }

  async create(username: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new HttpException('Username is already taken', HttpStatus.BAD_REQUEST);
    }
      // Create a new user
    const newUser = this.userRepository.create({username});
    return this.userRepository.save(newUser);
  }
}
