import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly repository: Repository<Product>) {}
  create(dto: CreateProductDto): Promise<Product> { return this.repository.save(this.repository.create(dto as unknown as Product)); }
  findAll(): Promise<Product[]> { return this.repository.find({ order: { createdAt: 'DESC' } }); }
  async findOne(id: string): Promise<Product> { const item = await this.repository.findOneBy({ id }); if (!item) throw new NotFoundException('Product não encontrado'); return item; }
  async update(id: string, dto: UpdateProductDto): Promise<Product> { const item = await this.findOne(id); return this.repository.save(Object.assign(item, dto)); }
  async remove(id: string): Promise<void> { await this.repository.delete(id); }
}
