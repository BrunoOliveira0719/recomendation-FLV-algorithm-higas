import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  category: string;
  @IsString()
  unit: string;
  @IsInt()
  shelfLifeDays: number;
  @IsNumber()
  minimumStock: number;
  @IsBoolean()
  active: boolean;
}
