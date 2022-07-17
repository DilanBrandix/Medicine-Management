import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { MedicineEntity } from '../model/medicine.entity';
import { MedicinePost } from '../model/medicine.interface';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private readonly medicineRepository: Repository<MedicineEntity>,
  ) {}
  createMedicine(medicinepost: MedicinePost): Observable<MedicinePost> {
    return from(this.medicineRepository.save(medicinepost));
  }
  findAll(): Observable<MedicinePost[]> {
    return from(this.medicineRepository.find());
  }
  deleteMedicine(id: number): Observable<DeleteResult> {
    return from(this.medicineRepository.delete(id));
  }

  async finditems(): Promise<any> {
    return await this.medicineRepository.query(`EXECUTE medicine_items`);
  }
}
