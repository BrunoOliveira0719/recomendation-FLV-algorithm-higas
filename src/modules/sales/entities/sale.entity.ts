import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('sales')
export class Sale extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  productId: string;
  @Column({ type: 'decimal', nullable: false })
  quantity: number;
  @Column({ type: 'decimal', nullable: false })
  unitPrice: number;
  @Column({ type: 'timestamp', nullable: false })
  soldAt: Date;
}
