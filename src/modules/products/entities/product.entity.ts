import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false })
  category: string;
  @Column({ type: 'varchar', nullable: false })
  unit: string;
  @Column({ type: 'decimal', nullable: false })
  shelfLifeDays: number;
  @Column({ type: 'decimal', nullable: false })
  minimumStock: number;
  @Column({ type: 'varchar', default: true })
  active: boolean;
}
