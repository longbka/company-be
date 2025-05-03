import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class CreateCompanyInfoDto {
  @IsString()
  name: string;

  @IsString()
  short_name: string;

  @IsString()
  slogan: string;

  @IsString()
  description: string;

  @IsString()
  mission: string;

  @IsString()
  vision: string;

  @IsString()
  organizational_structure: string;

  @IsNumberString()
  establish_year: number;

  @IsString()
  license_number: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  website: string;

  @IsString()
  logo_url: string;

  @IsString()
  @IsOptional()
  banner_url: string;

  @IsString()
  @IsOptional()
  facebook_url?: string;

  @IsString()
  @IsOptional()
  linkedin_url?: string;

  @IsString()
  @IsOptional()
  youtube_url?: string;

  @IsString()
  @IsOptional()
  map_embed?: string;
}
