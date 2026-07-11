import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(@InjectRepository(Inventory) private readonly repository: Repository<Inventory>) {}
  create(dto: CreateInventoryDto): Promise<Inventory> { return this.repository.save(this.repository.create(dto as unknown as Inventory)); }
  findAll(): Promise<Inventory[]> { return this.repository.find({ order: { createdAt: 'DESC' } }); }
  async findOne(id: string): Promise<Inventory> { const item = await this.repository.findOneBy({ id }); if (!item) throw new NotFoundException('Inventory não encontrado'); return item; }
  async update(id: string, dto: UpdateInventoryDto): Promise<Inventory> { const item = await this.findOne(id); return this.repository.save(Object.assign(item, dto)); }
  async remove(id: string): Promise<void> { await this.repository.delete(id); }
}
