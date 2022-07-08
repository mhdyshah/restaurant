import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createProductDto, editProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async showProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async showProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new ForbiddenException('no content');
    }
    return { product };
  }

  async createProduct(dto: createProductDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isAdmin === true) {
      const product = await this.prisma.product.create({
        data: {
          createdBy: user.fullName + ', id: ' + String(userId),
          ...dto,
        },
      });
      return { product, message: 'successfully created' };
    } else {
      throw new ForbiddenException('access to resource denied!');
    }
  }

  async editProduct(productId: number, dto: editProductDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isAdmin === true) {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new ForbiddenException('access to resources denied!');
      }
      return this.prisma.product.update({
        where: { id: productId },
        data: { updatedBy: user.fullName + ', id: ' + String(userId), ...dto },
      });
    } else {
      throw new ForbiddenException('access to resource denied!');
    }
  }

  async removeProduct(productId: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isAdmin === true) {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new ForbiddenException('access to resourse denied!');
      }
      await this.prisma.product.delete({ where: { id: productId } });
      console.log(
        `product whitj id: ${product.id} removed by Admin with id: ${user.id}`,
      );
      return 'successfully deleted';
    } else {
      throw new ForbiddenException('access to resource denied!');
    }
  }
}
