import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateProjectDto, SubProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Public } from '@/decorator/customize';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':slug')
  @Public()
  findOne(@Param('slug') slug: string) {
    return this.projectService.findProject(slug);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(slug, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Post(':projectSlug/subProjects')
  createSubProject(
    @Param('projectSlug') projectSlug: string,
    @Body() createSubProjectDto: SubProjectDto,
  ) {
    return this.projectService.createSubProject(
      projectSlug,
      createSubProjectDto,
    );
  }

  @Patch(':projectSlug/:subProjectSlug')
  updateSubProject(
    @Param('projectSlug') projectSlug: string,
    @Param('subProjectSlug') subProjectSlug: string,
    @Body() updateSubProjectDto: SubProjectDto,
  ) {
    return this.projectService.updateSubProject(
      projectSlug,
      subProjectSlug,
      updateSubProjectDto,
    );
  }
}
