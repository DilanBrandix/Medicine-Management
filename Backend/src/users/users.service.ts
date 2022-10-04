import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from './model/user.entity';
import { UserPost } from './model/user.interface';

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
  createUser(userpost: UserPost): Observable<UserPost> {
    return from(this.userRepository.save(userpost));
  }
  findAll(): Observable<UserPost[]> {
    return from(this.userRepository.find());
  }
  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }
  updateUser(id: number, userPost: UserPost): Observable<UpdateResult> {
    return from(this.userRepository.update(id, userPost));
  }
  getByUsername(id: number): Promise<any> {
    return this.userRepository.findOne(id);
  }
}
