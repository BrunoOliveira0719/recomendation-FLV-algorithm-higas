import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateInventoryDto {
  @IsUUID()
  productId: string;
  @IsNumber()
  quantity: number;
  @IsNumber()
  reservedQuantity: number;
  @IsDateString()
  expirationDate: string;
}
