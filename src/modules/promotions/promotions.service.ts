import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionsService {
  constructor(@InjectRepository(Promotion) private readonly repository: Repository<Promotion>) {}
  create(dto: CreatePromotionDto): Promise<Promotion> { return this.repository.save(this.repository.create(dto as unknown as Promotion)); }
  findAll(): Promise<Promotion[]> { return this.repository.find({ order: { createdAt: 'DESC' } }); }
  async findOne(id: string): Promise<Promotion> { const item = await this.repository.findOneBy({ id }); if (!item) throw new NotFoundException('Promotion não encontrado'); return item; }
  async update(id: string, dto: UpdatePromotionDto): Promise<Promotion> { const item = await this.findOne(id); return this.repository.save(Object.assign(item, dto)); }
  async remove(id: string): Promise<void> { await this.repository.delete(id); }
}
