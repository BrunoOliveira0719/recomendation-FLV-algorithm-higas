import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { ForecastRequestDto } from './dto/forecast-request.dto';
@ApiTags('ia')
@Controller('ai')
export class AiController { constructor(private readonly service: AiService) {} @Post('forecast') forecast(@Body() dto: ForecastRequestDto) { return this.service.forecast(dto); } }
