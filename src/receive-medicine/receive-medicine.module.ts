import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiveMedicineController } from './controllers/receive-medicine.controller';
import { ReceiveMedicineService } from './services/receive-medicine.service';
import { ReceiveMedicineEntity } from './model/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceiveMedicineEntity])],
  controllers: [ReceiveMedicineController],
  providers: [ReceiveMedicineService],
})
export class ReceiveMedecineModule {}
