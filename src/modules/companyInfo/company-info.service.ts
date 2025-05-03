import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyInfo, CompanyInfoDocument } from './schema/company-info.schema';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Injectable()
export class CompanyInfoService {
  constructor(
    @InjectModel(CompanyInfo.name)
    private companyInfoModel: Model<CompanyInfoDocument>,
  ) {}

  async create(
    createCompanyInfoDto: CreateCompanyInfoDto,
  ): Promise<CompanyInfo> {
    const createdCompanyInfo = new this.companyInfoModel(createCompanyInfoDto);
    return createdCompanyInfo.save();
  }

  async findAll(): Promise<CompanyInfo[]> {
    return this.companyInfoModel.find().exec();
  }

  async findOne(id: string): Promise<CompanyInfo> {
    const companyInfo = await this.companyInfoModel.findById(id).exec();
    if (!companyInfo) {
      throw new NotFoundException(`CompanyInfo with ID ${id} not found`);
    }
    return companyInfo;
  }

  async update(
    id: string,
    updateCompanyInfoDto: UpdateCompanyInfoDto,
  ): Promise<CompanyInfo> {
    const updatedCompanyInfo = await this.companyInfoModel
      .findByIdAndUpdate(id, updateCompanyInfoDto, { new: true })
      .exec();
    if (!updatedCompanyInfo) {
      throw new NotFoundException(`CompanyInfo with ID ${id} not found`);
    }
    return updatedCompanyInfo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.companyInfoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`CompanyInfo with ID ${id} not found`);
    }
  }
}
