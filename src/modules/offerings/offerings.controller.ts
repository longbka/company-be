import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateOfferingDto, SubOfferingDto } from './dto/create-offering.dto';
import { OfferingsService } from './offerings.service';
import { UpdateOfferingDto } from './dto/update-offering.dto';
import { Public } from '@/decorator/customize';

@Controller('offerings')
export class OfferingsController {
  constructor(private readonly offeringService: OfferingsService) {}

  @Post()
  create(@Body() createProjectDto: CreateOfferingDto) {
    return this.offeringService.create(createProjectDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.offeringService.findAll();
  }

  @Get(':slug')
  @Public()
  findOne(@Param('slug') slug: string) {
    return this.offeringService.findOffering(slug);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() UpdateOfferingDto: UpdateOfferingDto,
  ) {
    return this.offeringService.update(slug, UpdateOfferingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offeringService.remove(id);
  }

  @Post(':offeringSlug/offering')
  createSubOffering(
    @Param('offeringSlug') offeringSlug: string,
    @Body() createSubOffering: SubOfferingDto,
  ) {
    return this.offeringService.createSubOffering(
      offeringSlug,
      createSubOffering,
    );
  }

  @Patch(':offeringSlug/:subOfferingSlug')
  updateSubProject(
    @Param('offeringSlug') offeringSlug: string,
    @Param('subOfferingSlug') subOfferingSlug: string,
    @Body() updateSubOffering: SubOfferingDto,
  ) {
    return this.offeringService.updateSubOffering(
      offeringSlug,
      subOfferingSlug,
      updateSubOffering,
    );
  }

  @Get(':offeringSlug/:subOfferingSlug')
  @Public()
  findSubOffering(
    @Param('offeringSlug') offeringSlug: string,
    @Param('subOfferingSlug') subOfferingSlug: string,
  ) {
    return this.offeringService.findSubOffering(offeringSlug, subOfferingSlug);
  }
}
