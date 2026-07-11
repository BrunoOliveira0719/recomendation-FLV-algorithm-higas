import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateLossDto {
  @IsUUID()
  productId: string;
  @IsNumber()
  quantity: number;
  @IsString()
  reason: string;
  @IsDateString()
  lostAt: string;
}
