import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicine')
export class MedicineEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ default: '' })
  item: string;

  @Column({ default: '' })
  sku: string;

  @Column({ default: '' })
  uom: string;

  @Column({ default: '' })
  min_stock: number;
}
