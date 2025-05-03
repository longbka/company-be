import { IsArray, IsOptional, IsString } from 'class-validator';
import { SubOfferingDto } from './create-offering.dto';

export class UpdateOfferingDto {
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
  subOfferings?: SubOfferingDto[];
}
