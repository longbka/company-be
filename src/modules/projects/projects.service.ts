import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Projects,
  ProjectDocument,
  SubProjects,
} from './schema/project.schema';
import { CreateProjectDto, SubProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Projects.name)
    private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Projects> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(): Promise<Projects[]> {
    return this.projectModel
      .find()
      .select('-content -subProjects.content')
      .exec();
  }

  async findProject(slug: string): Promise<Projects> {
    const project = await this.projectModel.findOne({ slug }).exec();
    if (!project) {
      throw new NotFoundException(`Project với slug ${slug} không tồn tại`);
    }
    return project;
  }

  async update(
    slug: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Projects> {
    const updatedProject = await this.projectModel
      .findOneAndUpdate({ slug }, updateProjectDto, { new: true })
      .exec();
    if (!updatedProject) {
      throw new NotFoundException(`Project với slug ${slug} không tồn tại`);
    }
    return updatedProject;
  }

  async remove(slug: string): Promise<void> {
    const result = await this.projectModel.findOneAndDelete({ slug }).exec();
    if (!result) {
      throw new NotFoundException(`Project với slug ${slug} không tồn tại`);
    }
  }

  async createSubProject(
    projectSlug: string,
    createSubProjectDto: SubProjectDto,
  ): Promise<Projects> {
    const project = await this.projectModel
      .findOne({ slug: projectSlug })
      .exec();
    if (!project) {
      throw new NotFoundException(
        `Project với slug ${projectSlug} không tồn tại`,
      );
    }

    if (
      project.subProjects.some((sub) => sub.slug === createSubProjectDto.slug)
    ) {
      throw new NotFoundException(
        `SubProject với slug ${createSubProjectDto.slug} đã tồn tại`,
      );
    }

    const subProject: SubProjects = {
      title: createSubProjectDto.title,
      slug: createSubProjectDto.slug,
      excerpt: createSubProjectDto.excerpt ?? '',
      content: createSubProjectDto.content ?? '',
      thumbnail_url: createSubProjectDto.thumbnail_url ?? '',
      location: createSubProjectDto.location ?? '',
      start_date: createSubProjectDto.start_date ?? new Date(),
      end_date: createSubProjectDto.end_date ?? new Date(),
      is_typical: createSubProjectDto.is_typical ?? new Date(),
    };

    project.subProjects.push(subProject);
    return project.save();
  }

  async updateSubProject(
    projectSlug: string,
    subProjectSlug: string,
    updateSubProjectDto: SubProjectDto,
  ): Promise<Projects> {
    const project = await this.projectModel
      .findOne({ slug: projectSlug })
      .exec();
    if (!project) {
      throw new NotFoundException(
        `Project với slug ${projectSlug} không tồn tại`,
      );
    }
    const subProjectIndex = project.subProjects.findIndex(
      (sub) => sub.slug === subProjectSlug,
    );
    if (subProjectIndex === -1) {
      throw new NotFoundException(
        `SubProject với slug ${subProjectSlug} không tồn tại`,
      );
    }
    project.subProjects[subProjectIndex] = {
      ...project.subProjects[subProjectIndex],
      ...updateSubProjectDto,
    };

    return project.save();
  }
}
