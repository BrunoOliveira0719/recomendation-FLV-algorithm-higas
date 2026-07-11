import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('purchases')
export class Purchase extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  productId: string;
  @Column({ type: 'decimal', nullable: false })
  quantity: number;
  @Column({ type: 'decimal', nullable: false })
  unitCost: number;
  @Column({ type: 'varchar', nullable: false })
  supplier: string;
  @Column({ type: 'timestamp', nullable: false })
  purchasedAt: Date;
}
