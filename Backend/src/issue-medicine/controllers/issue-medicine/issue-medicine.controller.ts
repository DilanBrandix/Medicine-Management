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

  @Get('transaction_details')
  findTransaction(): Promise<any> {
    return this.issuemedicineService.findTransaction();
  }

  @Get('expire_details')
  findExpDetails(): Promise<any> {
    return this.issuemedicineService.findExpDetails();
  }
  @Get('min_stock')
  findMinStockLevel(): Promise<any> {
    return this.issuemedicineService.findMinStockLevel();
  }
  @Get('balance')
  getBalance(): Promise<any> {
    return this.issuemedicineService.getBalance();
  }
}
