import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Column({ nullable: false, default: '' })
  uuid: string;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @Column({ default: true })
  state: boolean;
}
