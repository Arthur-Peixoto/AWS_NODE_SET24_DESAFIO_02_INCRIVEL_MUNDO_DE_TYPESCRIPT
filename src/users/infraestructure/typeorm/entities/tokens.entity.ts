
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string; 

  @Column('text')
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  expiresAt: Date;
}
