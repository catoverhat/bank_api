import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.accounts)
  // user: User;

  @Column()
  account: string;

  @Column()
  balance: number;

  @Column({default:true})
  state: boolean;
}
