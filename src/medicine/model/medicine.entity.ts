import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicine')
export class MedicineEntity {
  @PrimaryColumn()
  no: number;

  @Column({ default: '' })
  item: string;

  @Column({ default: '' })
  sku: string;
}
