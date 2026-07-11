import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(@InjectRepository(Purchase) private readonly repository: Repository<Purchase>) {}
  create(dto: CreatePurchaseDto): Promise<Purchase> { return this.repository.save(this.repository.create(dto as unknown as Purchase)); }
  findAll(): Promise<Purchase[]> { return this.repository.find({ order: { createdAt: 'DESC' } }); }
  async findOne(id: string): Promise<Purchase> { const item = await this.repository.findOneBy({ id }); if (!item) throw new NotFoundException('Purchase não encontrado'); return item; }
  async update(id: string, dto: UpdatePurchaseDto): Promise<Purchase> { const item = await this.findOne(id); return this.repository.save(Object.assign(item, dto)); }
  async remove(id: string): Promise<void> { await this.repository.delete(id); }
}
