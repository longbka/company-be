import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Products,
  ProductDocument,
  SubProducts,
} from './schema/product.schema';
import { CreateProductDto, SubProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Products> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Products[]> {
    return this.productModel
      .find()
      .select('-content -subProducts.content')
      .exec();
  }

  async findProduct(slug: string): Promise<Products> {
    const product = await this.productModel.findOne({ slug }).exec();
    if (!product) {
      throw new NotFoundException(`Product với slug ${slug} không tồn tại`);
    }
    return product;
  }

  async update(
    slug: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ slug }, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product với slug ${slug} không tồn tại`);
    }
    return updatedProduct;
  }

  async remove(slug: string): Promise<void> {
    const result = await this.productModel.findOneAndDelete({ slug }).exec();
    if (!result) {
      throw new NotFoundException(`Product với slug ${slug} không tồn tại`);
    }
  }

  async createSubProduct(
    productSlug: string,
    createSubProduct: SubProductDto,
  ): Promise<Products> {
    const product = await this.productModel
      .findOne({ slug: productSlug })
      .exec();
    if (!product) {
      throw new NotFoundException(
        `Product với slug ${productSlug} không tồn tại`,
      );
    }

    if (product.subProducts.some((sub) => sub.slug === createSubProduct.slug)) {
      throw new NotFoundException(
        `SubProduct với slug ${createSubProduct.slug} đã tồn tại`,
      );
    }

    const subProduct: SubProducts = {
      title: createSubProduct.title,
      slug: createSubProduct.slug,
      excerpt: createSubProduct.excerpt ?? '',
      content: createSubProduct.content ?? '',
      thumbnail_url: createSubProduct.thumbnail_url ?? '',
      location: createSubProduct.location ?? '',
      start_date: createSubProduct.start_date ?? new Date(),
      end_date: createSubProduct.end_date ?? new Date(),
      is_typical: createSubProduct.is_typical ?? new Date(),
    };

    product.subProducts.push(subProduct);
    return product.save();
  }

  async updateSubProduct(
    productSlug: string,
    subProductSlug: string,
    updateSubProduct: SubProductDto,
  ): Promise<Products> {
    const product = await this.productModel
      .findOne({ slug: productSlug })
      .exec();
    if (!product) {
      throw new NotFoundException(
        `Product với slug ${productSlug} không tồn tại`,
      );
    }
    const subProductIndex = product.subProducts.findIndex(
      (sub) => sub.slug === subProductSlug,
    );
    if (subProductIndex === -1) {
      throw new NotFoundException(
        `SubProduct với slug ${subProductSlug} không tồn tại`,
      );
    }
    product.subProducts[subProductIndex] = {
      ...product.subProducts[subProductIndex],
      ...updateSubProduct,
    };

    return product.save();
  }
}
