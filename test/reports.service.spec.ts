import { ReportsService } from '../src/modules/reports/reports.service';

describe('ReportsService', () => {
  it('summarizes operational metrics', async () => {
    const service = new ReportsService(
      { findAll: async () => [{ quantity: 2, unitPrice: 10 }] } as never,
      { findAll: async () => [{ quantity: 1 }] } as never,
      { findAll: async () => [{ quantity: 5 }] } as never,
    );
    await expect(service.operationalSummary()).resolves.toMatchObject({ salesCount: 1, revenue: 20, lossQuantity: 1 });
  });
});
