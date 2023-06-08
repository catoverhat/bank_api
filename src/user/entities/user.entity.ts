import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { Account } from 'src/account/entities/account.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 255)
  username: string;

  @OneToMany(() => Account, account => account.user)
  accounts: Account[];
}