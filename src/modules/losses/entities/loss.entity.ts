import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('losses')
export class Loss extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  productId: string;
  @Column({ type: 'decimal', nullable: false })
  quantity: number;
  @Column({ type: 'varchar', nullable: false })
  reason: string;
  @Column({ type: 'timestamp', nullable: false })
  lostAt: Date;
}
