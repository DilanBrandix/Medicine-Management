import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ default: '' })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  user_role: string;
}
