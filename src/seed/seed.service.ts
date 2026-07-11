import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductsService } from '../modules/products/products.service';
@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly products: ProductsService) {}
  async onModuleInit() {
    if ((await this.products.findAll()).length) return;
    for (const name of ['Banana Prata', 'Tomate Italiano', 'Alface Crespa', 'Maçã Fuji', 'Batata Inglesa']) await this.products.create({ name, category: 'hortifruti', unit: 'kg', shelfLifeDays: 7, minimumStock: 20, active: true });
  }
}
