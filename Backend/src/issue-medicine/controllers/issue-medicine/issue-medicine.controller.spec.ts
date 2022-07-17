import { Test, TestingModule } from '@nestjs/testing';
import { IssueMedicineController } from './issue-medicine.controller';

describe('IssueMedicineController', () => {
  let controller: IssueMedicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueMedicineController],
    }).compile();

    controller = module.get<IssueMedicineController>(IssueMedicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
