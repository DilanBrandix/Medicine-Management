import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('issue_medicine')
export class IssueMedicineEntity {
  @PrimaryGeneratedColumn()
  no: number;

  @Column({ default: '' })
  issue_no: number;

  @Column({ default: '' })
  issue_date: Date;

  @Column({ default: '' })
  item: string;

  @Column({ default: '' })
  sku: string;

  @Column({ default: '' })
  uom: string;

  @Column({ default: '' })
  method: string;

  @Column({ default: '' })
  manufacture_date: Date;

  @Column({ default: '' })
  expire_date: Date;

  @Column({ default: '' })
  quantity: number;
}
