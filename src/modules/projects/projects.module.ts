import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Projects, ProjectSchema } from './schema/project.schema';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Projects.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
