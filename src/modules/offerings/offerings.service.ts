import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OfferingDocument,
  Offerings,
  SubOfferings,
} from './schema/offering.schema';
import { CreateOfferingDto, SubOfferingDto } from './dto/create-offering.dto';
import { UpdateOfferingDto } from './dto/update-offering.dto';

@Injectable()
export class OfferingsService {
  constructor(
    @InjectModel(Offerings.name)
    private offeringModel: Model<OfferingDocument>,
  ) {}

  async create(createOfferingDto: CreateOfferingDto): Promise<Offerings> {
    const createdOffering = new this.offeringModel(createOfferingDto);
    return createdOffering.save();
  }

  async findAll(): Promise<Offerings[]> {
    return this.offeringModel
      .find()
      .select('-content -subOfferings.content')
      .exec();
  }

  async findOffering(slug: string): Promise<Offerings> {
    const offering = await this.offeringModel.findOne({ slug }).exec();
    if (!offering) {
      throw new NotFoundException(`Offering với slug ${slug} không tồn tại`);
    }
    return offering;
  }

  async update(
    slug: string,
    updateOfferingDto: UpdateOfferingDto,
  ): Promise<Offerings> {
    const updatedOffering = await this.offeringModel
      .findOneAndUpdate({ slug }, updateOfferingDto, { new: true })
      .exec();
    if (!updatedOffering) {
      throw new NotFoundException(`Offering với slug ${slug} không tồn tại`);
    }
    return updatedOffering;
  }

  async remove(slug: string): Promise<void> {
    const result = await this.offeringModel.findOneAndDelete({ slug }).exec();
    if (!result) {
      throw new NotFoundException(`Offering với slug ${slug} không tồn tại`);
    }
  }

  async createSubOffering(
    offeringSlug: string,
    createSubOffering: SubOfferingDto,
  ): Promise<Offerings> {
    const offering = await this.offeringModel
      .findOne({ slug: offeringSlug })
      .exec();
    if (!offering) {
      throw new NotFoundException(
        `Offering với slug ${offeringSlug} không tồn tại`,
      );
    }

    if (
      offering.subOfferings.some((sub) => sub.slug === createSubOffering.slug)
    ) {
      throw new NotFoundException(
        `SubOffering với slug ${createSubOffering.slug} đã tồn tại`,
      );
    }

    const subOffering: SubOfferings = {
      title: createSubOffering.title,
      slug: createSubOffering.slug,
      excerpt: createSubOffering.excerpt ?? '',
      content: createSubOffering.content ?? '',
      thumbnail_url: createSubOffering.thumbnail_url ?? '',
      location: createSubOffering.location ?? '',
      start_date: createSubOffering.start_date ?? new Date(),
      end_date: createSubOffering.end_date ?? new Date(),
      is_typical: createSubOffering.is_typical ?? new Date(),
    };

    offering.subOfferings.push(subOffering);
    return offering.save();
  }

  async updateSubOffering(
    offeringSlug: string,
    subOfferingSlug: string,
    updateSubOffering: SubOfferingDto,
  ): Promise<Offerings> {
    const offering = await this.offeringModel
      .findOne({ slug: offeringSlug })
      .exec();
    if (!offering) {
      throw new NotFoundException(
        `Offering với slug ${offeringSlug} không tồn tại`,
      );
    }
    const subOfferingIndex = offering.subOfferings.findIndex(
      (sub) => sub.slug === subOfferingSlug,
    );
    if (subOfferingIndex === -1) {
      throw new NotFoundException(
        `SubOffering với slug ${subOfferingSlug} không tồn tại`,
      );
    }
    offering.subOfferings[subOfferingIndex] = {
      ...offering.subOfferings[subOfferingIndex],
      ...updateSubOffering,
    };

    return offering.save();
  }

  async findSubOffering(
    offeringSlug: string,
    subOfferingSlug: string,
  ): Promise<SubOfferings> {
    const offering = await this.offeringModel
      .findOne({ slug: offeringSlug })
      .exec();

    if (!offering) {
      throw new NotFoundException(
        `Offering với slug ${offeringSlug} không tồn tại`,
      );
    }

    const subOffering = offering.subOfferings.find(
      (sub) => sub.slug === subOfferingSlug,
    );

    if (!subOffering) {
      throw new NotFoundException(
        `SubOffering với slug ${subOfferingSlug} không tồn tại trong offering ${offeringSlug}`,
      );
    }

    return subOffering;
  }
}
