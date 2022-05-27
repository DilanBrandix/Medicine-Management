import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './model/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUser(user: any): Promise<any> {
    try {
      const userFromDb = await this.userRepository.findOne({
        username: user.username,
      });

      if (userFromDb === undefined) {
        return { message: 'User is not available', error: true };
      }

      if (
        userFromDb.password.toLowerCase().trim() !==
        user.password.toLowerCase().trim()
      ) {
        return { message: 'Invalid password', error: true };
      }

      return { userFromDb, error: false };
    } catch (e) {
      return e.message;
    }
  }
}
