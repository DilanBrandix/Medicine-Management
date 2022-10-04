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
  // testing code
  // @Post('/item')
  // checkItem(@Body() item: any) {
  //   return this.receivemedicineService.findSku(item);
  // }

  // testing code 2
  @Get('items/:item')
  getSpecificSku(@Param('item') item: string): Promise<any> {
    return this.receivemedicineService.getSpecificSku(item);
  }

  @Get('items/:item/:sku/:plant')
  async getSpecificSkuItem(
    @Param('item') item: string,
    @Param('sku') sku: string,
    @Param('plant') plant: string,
  ): Promise<any> {
    return this.receivemedicineService.getSpecificSkuItem(item, sku, plant);
  }
  @Get('uom/:item/:sku')
  getSpecificUom(
    @Param('item') item: string,
    @Param('sku') sku: string,
  ): Promise<any> {
    return this.receivemedicineService.getSpecificUom(item, sku);
  }

  @Get()
  findAll(): Observable<ReceivePost[]> {
    return this.receivemedicineService.findAll();
  }
}
