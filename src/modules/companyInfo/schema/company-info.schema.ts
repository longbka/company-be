import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyInfoDocument = Document & CompanyInfo;

@Schema({ timestamps: true })
export class CompanyInfo {
  @Prop()
  name: string;

  @Prop()
  short_name: string;

  @Prop()
  slogan: string;

  @Prop()
  description: string;

  @Prop()
  mission: string;

  @Prop()
  vision: string;

  @Prop()
  organizational_structure: string;

  @Prop()
  establishYear: number;

  @Prop()
  license_number: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop()
  logoUrl: string;

  @Prop()
  bannerUrl: string;

  @Prop()
  facebookUrl: string;

  @Prop()
  linkedinUrl: string;

  @Prop()
  youtubeUrl: string;

  @Prop()
  mapEmbed: string;
}

export const CompanyInfoSchema = SchemaFactory.createForClass(CompanyInfo);
