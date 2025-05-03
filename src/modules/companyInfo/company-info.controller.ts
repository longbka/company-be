import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';
import { Public } from '@/decorator/customize';

@Controller('company-info')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  @Post()
  create(@Body() createCompanyInfoDto: CreateCompanyInfoDto) {
    return this.companyInfoService.create(createCompanyInfoDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.companyInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyInfoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyInfoDto: UpdateCompanyInfoDto,
  ) {
    return this.companyInfoService.update(id, updateCompanyInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyInfoService.remove(id);
  }
}
