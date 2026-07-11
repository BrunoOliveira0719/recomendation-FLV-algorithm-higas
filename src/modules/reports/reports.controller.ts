import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
@ApiTags('relatorios')
@Controller('reports')
export class ReportsController { constructor(private readonly service: ReportsService) {} @Get('summary') summary() { return this.service.operationalSummary(); } }
