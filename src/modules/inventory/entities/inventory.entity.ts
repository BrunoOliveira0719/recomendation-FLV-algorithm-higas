import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('inventory')
export class Inventory extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  productId: string;
  @Column({ type: 'decimal', nullable: false })
  quantity: number;
  @Column({ type: 'decimal', nullable: false })
  reservedQuantity: number;
  @Column({ type: 'timestamp', nullable: false })
  expirationDate: Date;
}
