import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  @IsInt()
  userId: number;

  @Column({ nullable: false, default: '' })
  @IsNotEmpty()
  @Length(1, 255)
  accountFrom: string;

  @Column({ nullable: false, default: '' })
  @IsNotEmpty()
  @Length(1, 255)
  accountTo: string;

  @Column({ nullable: false, default: 0 })
  @IsNumber()
  @IsPositive()
  amount: number;
  
  // @Column()
  // date:Date
}
