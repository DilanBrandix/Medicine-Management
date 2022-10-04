import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  user_role: string;

  @Column({ default: '' })
  plant: string;

  @Column({ default: '' })
  employee_Name: string;

  @Column({ default: '' })
  email: string;
}
