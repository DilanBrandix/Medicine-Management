import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueMedicineController } from './controllers/issue-medicine/issue-medicine.controller';
import { IssueMedicineService } from './services/issue-medicine.service';
import { IssueMedicineEntity } from './model/issue-medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueMedicineEntity])],
  controllers: [IssueMedicineController],
  providers: [IssueMedicineService],
})
export class IssueMedicineModule {}
