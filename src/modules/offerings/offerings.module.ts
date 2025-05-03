import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Offerings, OfferingsSchema } from './schema/offering.schema';
import { OfferingsController } from './offerings.controller';
import { OfferingsService } from './offerings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offerings.name, schema: OfferingsSchema },
    ]),
  ],
  controllers: [OfferingsController],
  providers: [OfferingsService],
})
export class OfferingsModule {}
