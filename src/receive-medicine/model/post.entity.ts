import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receive_medicine')
export class ReceiveMedicineEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ default: '' })
  date: Date;

  @Column({ default: '' })
  item: string;

  @Column({ default: '' })
  sku: string;

  @Column({ default: '' })
  uom: string;

  @Column({ default: '' })
  quantity: number;
}
