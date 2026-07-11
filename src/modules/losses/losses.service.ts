import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loss } from './entities/loss.entity';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';

@Injectable()
export class LossesService {
  constructor(@InjectRepository(Loss) private readonly repository: Repository<Loss>) {}
  create(dto: CreateLossDto): Promise<Loss> { return this.repository.save(this.repository.create(dto as unknown as Loss)); }
  findAll(): Promise<Loss[]> { return this.repository.find({ order: { createdAt: 'DESC' } }); }
  async findOne(id: string): Promise<Loss> { const item = await this.repository.findOneBy({ id }); if (!item) throw new NotFoundException('Loss não encontrado'); return item; }
  async update(id: string, dto: UpdateLossDto): Promise<Loss> { const item = await this.findOne(id); return this.repository.save(Object.assign(item, dto)); }
  async remove(id: string): Promise<void> { await this.repository.delete(id); }
}
