import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('promotions')
export class Promotion extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  productId: string;
  @Column({ type: 'decimal', nullable: false })
  discountPercentage: number;
  @Column({ type: 'timestamp', nullable: false })
  startsAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  endsAt: Date;
  @Column({ type: 'varchar', nullable: false })
  description: string;
}
