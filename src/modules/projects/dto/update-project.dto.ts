import { IsString, IsArray, IsOptional } from 'class-validator';
import { SubProjectDto } from './create-project.dto';

export class UpdateProjectDto {
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
