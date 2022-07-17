import { Module } from '@nestjs/common';
import { MedicineController } from './controllers/medicine/medicine.controller';
import { MedicineService } from './services/medicine.service';
import { MedicineEntity } from './model/medicine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineEntity])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
