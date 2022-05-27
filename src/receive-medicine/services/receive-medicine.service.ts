import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { ReceiveMedicineEntity } from '../model/post.entity';
import { ReceivePost } from '../model/post.interface';

@Injectable()
export class ReceiveMedicineService {
  constructor(
    @InjectRepository(ReceiveMedicineEntity)
    private readonly receivemedicineRepository: Repository<ReceiveMedicineEntity>,
  ) {}
  create(receivepost: ReceivePost): Observable<ReceivePost> {
    return from(this.receivemedicineRepository.save(receivepost));
  }
  findAll(): Observable<ReceivePost[]> {
    return from(this.receivemedicineRepository.find());
  }
}
