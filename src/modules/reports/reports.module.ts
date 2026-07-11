import { Module } from '@nestjs/common';
import { SalesModule } from '../sales/sales.module';
import { LossesModule } from '../losses/losses.module';
import { PurchasesModule } from '../purchases/purchases.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
@Module({ imports: [SalesModule, LossesModule, PurchasesModule], controllers: [ReportsController], providers: [ReportsService], exports: [ReportsService] })
export class ReportsModule {}
