import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportsService } from '../reports/reports.service';
@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController { constructor(private readonly reports: ReportsService) {} @Get() async overview() { return { generatedAt: new Date().toISOString(), summary: await this.reports.operationalSummary() }; } }
