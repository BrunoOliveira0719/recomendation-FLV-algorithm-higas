import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(@InjectRepository(Sale) private readonly repository: Repository<Sale>) {}
  create(dto: CreateSaleDto): Promise<Sale> { return this.repository.save(this.repository.create(dto as unknown as Sale)); }
  findAll(): Promise<Sale[]> { return this.repository.find({ order: { createdAt: 'DESC' } }); }
  async findOne(id: string): Promise<Sale> { const item = await this.repository.findOneBy({ id }); if (!item) throw new NotFoundException('Sale não encontrado'); return item; }
  async update(id: string, dto: UpdateSaleDto): Promise<Sale> { const item = await this.findOne(id); return this.repository.save(Object.assign(item, dto)); }
  async remove(id: string): Promise<void> { await this.repository.delete(id); }
}
