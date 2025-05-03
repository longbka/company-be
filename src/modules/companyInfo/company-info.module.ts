import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyInfo, CompanyInfoSchema } from './schema/company-info.schema';
import { CompanyInfoController } from './company-info.controller';
import { CompanyInfoService } from './company-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyInfo.name, schema: CompanyInfoSchema },
    ]),
  ],
  controllers: [CompanyInfoController],
  providers: [CompanyInfoService],
})
export class CompanyInfoModule {}
