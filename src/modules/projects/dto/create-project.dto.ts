import { IsString, IsArray, IsOptional, IsDateString } from 'class-validator';

export class SubProjectDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  excerpt: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  is_typical: boolean;

  @IsString()
  @IsOptional()
  thumbnail_url: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsDateString()
  @IsOptional()
  start_date: Date;

  @IsDateString()
  @IsOptional()
  end_date: Date;
}

export class CreateProjectDto {
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
  subProjects?: SubProjectDto[];
}
