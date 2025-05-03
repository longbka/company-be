import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferingDocument = Document & Offerings;

@Schema({ timestamps: true })
export class SubOfferings {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  excerpt: string;

  @Prop()
  content: string;

  @Prop()
  is_typical: boolean;

  @Prop()
  thumbnail_url: string;

  @Prop()
  location: string;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;
}

@Schema({ timestamps: true })
export class Offerings {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  is: string;

  @Prop()
  thumbnail_url: string;

  @Prop([SubOfferings])
  subOfferings: SubOfferings[];
}

export const OfferingsSchema = SchemaFactory.createForClass(Offerings);
