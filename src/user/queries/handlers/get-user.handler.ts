// import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../../entities/user';
// import { GetUserQuery } from '../../queries/impl/get-user.query';

// @QueryHandler(GetUserQuery)
// export class GetUserHandler implements IQueryHandler<GetUserQuery> {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//   ) {}

//   async execute(query: GetUserQuery): Promise<User[]> {
//     return await this.userRepository.find();
//   }
// }
