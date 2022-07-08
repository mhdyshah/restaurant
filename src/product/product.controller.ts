import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { createProductDto, editProductDto } from './dto';
import { ProductService } from './product.service';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  showProducts(@Req() req: Request) {
    return this.productService.showProducts();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  showProduct(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.showProduct(productId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createProduct(@Body() dto: createProductDto, @GetUser('id') userId: number) {
    return this.productService.createProduct(dto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('edit/:id')
  editProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: editProductDto,
    @GetUser('id') userId: number,
  ) {
    return this.productService.editProduct(productId, dto, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  removeProduct(
    @Param('id', ParseIntPipe) productId: number,
    @GetUser('id') userId: number,
  ) {
    return this.productService.removeProduct(productId, userId);
  }
}
