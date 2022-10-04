import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IssuePost } from 'src/issue-medicine/model/issue-medicine.interface';
import { IssueMedicineService } from 'src/issue-medicine/services/issue-medicine.service';

@Controller('issue-medicine')
export class IssueMedicineController {
  constructor(private issuemedicineService: IssueMedicineService) {}

  @Post()
  create(@Body() issuepost: IssuePost): Observable<IssuePost> {
    return this.issuemedicineService.create(issuepost);
  }

  @Get()
  findAll(): Observable<IssuePost[]> {
    return this.issuemedicineService.findAll();
  }

  @Get('inv_details')
  findDetails(): Promise<any> {
    return this.issuemedicineService.findDetails();
  }
  @Get('inv_plant_details/:plant')
  findPlantDetails(@Param('plant') plant: string): Promise<any> {
    return this.issuemedicineService.findPlantDetails(plant);
  }

  @Get('transaction_details_plant/:plant')
  findPlantTransaction(@Param('plant') plant: string): Promise<any> {
    return this.issuemedicineService.findPlantTransaction(plant);
  }

  @Get('transaction_details')
  findTransaction(): Promise<any> {
    return this.issuemedicineService.findTransaction();
  }

  @Get('expire_details')
  findExpDetails(): Promise<any> {
    return this.issuemedicineService.findExpDetails();
  }
  @Get('expire_details_plant/:plant')
  findExpDetails_plant(@Param('plant') plant: string): Promise<any> {
    return this.issuemedicineService.findExpDetails_plant(plant);
  }
  @Get('min_stock')
  findMinStockLevel(): Promise<any> {
    return this.issuemedicineService.findMinStockLevel();
  }

  @Get('min_stock_plant/:plant')
  findMinStockLevel_plant(@Param('plant') plant: string): Promise<any> {
    return this.issuemedicineService.findMinStockLevel_plant(plant);
  }
  @Get('balance')
  getBalance(): Promise<any> {
    return this.issuemedicineService.getBalance();
  }
}
