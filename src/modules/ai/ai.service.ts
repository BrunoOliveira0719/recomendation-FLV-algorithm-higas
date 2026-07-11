import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ForecastRequestDto } from './dto/forecast-request.dto';
@Injectable()
export class AiService {
  constructor(private readonly config: ConfigService) {}
  async forecast(dto: ForecastRequestDto) {
    const baseURL = this.config.get('AI_SERVICE_URL', 'http://localhost:8000');
    const { data } = await axios.post(`${baseURL}/forecast`, dto, { timeout: 30000 });
    return data;
  }
}
