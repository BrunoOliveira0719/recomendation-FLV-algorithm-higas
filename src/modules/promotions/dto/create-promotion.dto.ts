import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePromotionDto {
  @IsUUID()
  productId: string;
  @IsNumber()
  discountPercentage: number;
  @IsDateString()
  startsAt: string;
  @IsDateString()
  endsAt: string;
  @IsString()
  description: string;
}
