import { Module } from '@nestjs/common';
import { ProductsModule } from '../modules/products/products.module';
import { SeedService } from './seed.service';
@Module({ imports: [ProductsModule], providers: [SeedService] })
export class SeedModule {}
