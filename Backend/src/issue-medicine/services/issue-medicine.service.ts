import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { IssueMedicineEntity } from '../model/issue-medicine.entity';
import { IssuePost } from '../model/issue-medicine.interface';

@Injectable()
export class IssueMedicineService {
  balance = 'this';
  constructor(
    @InjectRepository(IssueMedicineEntity)
    private readonly issuemedicineRepository: Repository<IssueMedicineEntity>,
  ) {}
  create(issuepost: IssuePost): Observable<IssuePost> {
    return from(this.issuemedicineRepository.save(issuepost));
  }
  findAll(): Observable<IssuePost[]> {
    return from(this.issuemedicineRepository.find());
  }
  async findDetails(): Promise<any> {
    return await this.issuemedicineRepository.query(
      `EXECUTE inventory_details_report`,
    );
  }
  async findPlantDetails(plant: string): Promise<any> {
    return await this.issuemedicineRepository.query(
      `EXECUTE inventory_details_report_nurse '${plant}'`,
    );
  }
  async findTransaction(): Promise<any> {
    return await this.issuemedicineRepository.query(
      `EXECUTE inventory_transaction_details`,
    );
  }

  async findPlantTransaction(plant: string): Promise<any> {
    return await this.issuemedicineRepository.query(
      `EXECUTE inventory_transaction_details_nurse'${plant}'`,
    );
  }
  async findExpDetails(): Promise<any> {
    return await this.issuemedicineRepository.query(`EXECUTE expire_details`);
  }
  async findExpDetails_plant(plant: string): Promise<any> {
    return await this.issuemedicineRepository.query(
      `EXECUTE expire_details_nurse '${plant}'`,
    );
  }
  async findMinStockLevel(): Promise<any> {
    return await this.issuemedicineRepository.query(`EXECUTE min_stock_level`);
  }
  async findMinStockLevel_plant(plant: string): Promise<any> {
    return await this.issuemedicineRepository.query(
      `EXECUTE min_stock_level_nurse '${plant}'`,
    );
  }
  async getBalance(): Promise<any> {
    return await this.issuemedicineRepository.query(`EXECUTE balance_Quantity`);
  }
}
