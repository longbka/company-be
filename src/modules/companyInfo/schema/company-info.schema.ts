import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyInfoDocument = Document & CompanyInfo;

@Schema({ timestamps: true })
export class CompanyInfo {
  @Prop()
  name: string;

  @Prop()
  shortName: string;

  @Prop()
  slogan: string;

  @Prop()
  description: string;

  @Prop()
  mission: string;

  @Prop()
  vision: string;

  @Prop()
  establishYear: number;

  @Prop()
  licenseNumber: string;

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
