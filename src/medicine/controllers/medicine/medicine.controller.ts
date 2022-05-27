import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MedicineService } from 'src/medicine/services/medicine.service';
import { MedicinePost } from 'src/medicine/model/medicine.interface';
import { DeleteResult } from 'typeorm';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post()
  create(@Body() medicinepost: MedicinePost): Observable<MedicinePost> {
    return this.medicineService.createMedicine(medicinepost);
  }
  @Get()
  findAll(): Observable<MedicinePost[]> {
    return this.medicineService.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.medicineService.deleteMedicine(id);
  }
}
