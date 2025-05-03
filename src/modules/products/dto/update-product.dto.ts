import { IsString, IsArray, IsOptional } from 'class-validator';
import { SubProductDto } from './create-product.dto';
export class UpdateProductDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  is_typical: boolean;

  @IsString()
  @IsOptional()
  thumbnail_url: string;

  @IsArray()
  @IsOptional()
  subProducts?: SubProductDto[];
}
