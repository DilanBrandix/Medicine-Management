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
  // async findSku(item: any): Promise<any> {
  //   return await this.receivemedicineRepository.query(
  //     `EXECUTE '${item.get_SKU}'`,
  //   );
  // }

  async getSpecificSku(item: string): Promise<any> {
    return await this.receivemedicineRepository.query(
      `EXECUTE get_SKU '${item}'`,
    );
  }

  async getSpecificSkuItem(item: string, sku: string): Promise<any> {
    return await this.receivemedicineRepository.query(
      `EXECUTE get_item_balance '${item}','${sku}'`,
    );
  }

  async getSpecificUom(item: string, sku: string): Promise<any> {
    return await this.receivemedicineRepository.query(
      `EXECUTE get_UOM '${item}','${sku}'`,
    );
  }

  findAll(): Observable<ReceivePost[]> {
    return from(this.receivemedicineRepository.find());
  }
}
