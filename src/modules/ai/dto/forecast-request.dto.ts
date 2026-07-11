import { IsArray, IsUUID } from 'class-validator';
export class ForecastRequestDto { @IsUUID() productId: string; @IsArray() history: Array<Record<string, unknown>>; }
