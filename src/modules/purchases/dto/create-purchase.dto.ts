import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID()
  productId: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  unitCost: number;
  @IsString()
  supplier: string;
  @IsDateString()
  purchasedAt: string;
}
