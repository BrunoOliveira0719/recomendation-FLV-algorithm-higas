import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { SalesModule } from './modules/sales/sales.module';
import { LossesModule } from './modules/losses/losses.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AiModule } from './modules/ai/ai.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SeedModule } from './seed/seed.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ProductsModule, InventoryModule, PurchasesModule, SalesModule, LossesModule, PromotionsModule, ReportsModule, AiModule, DashboardModule, SeedModule] })
export class AppModule {}
