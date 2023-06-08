import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsNumber, IsBoolean, Min } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Column({ nullable: false, default: '' })
  @IsNotEmpty()
  uuid: string;

  @Column({ nullable: false, default: 0 })
  @IsNumber()
  @Min(0)
  balance: number;

  @Column({ default: true })
  @IsBoolean()
  state: boolean;
}
