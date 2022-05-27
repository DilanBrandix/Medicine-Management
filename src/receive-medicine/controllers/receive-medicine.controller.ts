import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ReceivePost } from '../model/post.interface';
import { ReceiveMedicineService } from '../services/receive-medicine.service';

@Controller('receive-medicine')
export class ReceiveMedicineController {
  constructor(private receivemedicineService: ReceiveMedicineService) {}

  @Post()
  create(@Body() receivepost: ReceivePost): Observable<ReceivePost> {
    return this.receivemedicineService.create(receivepost);
  }
  @Get()
  findAll(): Observable<ReceivePost[]> {
    return this.receivemedicineService.findAll();
  }
}
