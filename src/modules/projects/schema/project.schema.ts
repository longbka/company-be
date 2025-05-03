import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Document & Projects;

@Schema({ timestamps: true })
export class SubProjects {
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
export class Projects {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  is_typical: string;

  @Prop()
  thumbnail_url: string;

  @Prop([SubProjects])
  subProjects: SubProjects[];
}

export const ProjectSchema = SchemaFactory.createForClass(Projects);
