import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  productId: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  unitPrice: number;
  @IsDateString()
  soldAt: string;
}
