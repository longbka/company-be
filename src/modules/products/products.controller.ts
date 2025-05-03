import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateProductDto, SubProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Public } from '@/decorator/customize';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProductDto) {
    return this.productService.create(createProjectDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':slug')
  @Public()
  findOne(@Param('slug') slug: string) {
    return this.productService.findProduct(slug);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() UpdateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(slug, UpdateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Post(':productSlug/product')
  createSubProduct(
    @Param('productSlug') productSlug: string,
    @Body() createSubProduct: SubProductDto,
  ) {
    return this.productService.createSubProduct(productSlug, createSubProduct);
  }

  @Patch(':productSlug/:subProductSlug')
  updateSubProject(
    @Param('productSlug') productSlug: string,
    @Param('subProductSlug') subProductSlug: string,
    @Body() updateSubProduct: SubProductDto,
  ) {
    return this.productService.updateSubProduct(
      productSlug,
      subProductSlug,
      updateSubProduct,
    );
  }
}
