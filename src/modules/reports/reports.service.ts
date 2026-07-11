import { Injectable } from '@nestjs/common';
import { SalesService } from '../sales/sales.service';
import { LossesService } from '../losses/losses.service';
import { PurchasesService } from '../purchases/purchases.service';
@Injectable()
export class ReportsService {
  constructor(private readonly sales: SalesService, private readonly losses: LossesService, private readonly purchases: PurchasesService) {}
  async operationalSummary() {
    const [sales, losses, purchases] = await Promise.all([this.sales.findAll(), this.losses.findAll(), this.purchases.findAll()]);
    return { salesCount: sales.length, lossesCount: losses.length, purchasesCount: purchases.length, revenue: sales.reduce((t, s) => t + Number(s.quantity) * Number(s.unitPrice), 0), lossQuantity: losses.reduce((t, l) => t + Number(l.quantity), 0) };
  }
}
