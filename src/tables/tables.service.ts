import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDto, EditTableDto } from './dto';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  async showTables() {
    const tables = await this.prisma.table.findMany();
    return tables;
  }

  async showTable(tableId: number) {
    const table = await this.prisma.table.findUnique({
      where: { id: tableId },
    });
    if (!table) {
      throw new ForbiddenException('no content');
    }
    return { table };
  }

  async createTable(dto: CreateTableDto, userId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (user.isAdmin === true) {
      const table = await this.prisma.table.create({
        data: {
          createdBy: user.fullName + ', id: ' + String(userId),
          ...dto,
        },
      });
      return { table, message: 'successfully created' };
    } else {
      throw new ForbiddenException('access to resource denied!');
    }
  }

  async editTable(tableId: number, dto: EditTableDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isAdmin === true) {
      const table = await this.prisma.table.findUnique({
        where: { id: tableId },
      });
      if (!table) {
        throw new ForbiddenException('access to resourse denieds!');
      }
      return this.prisma.table.updateMany({
        where: { id: tableId },
        data: {
          updatedBy: user.fullName + ', id: ' + String(userId),
          ...dto,
        },
      });
    } else {
      throw new ForbiddenException('access to resource denied!');
    }
  }

  async removeTable(tableId: number, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user.isAdmin === true) {
      const table = await this.prisma.table.findUnique({
        where: { id: tableId },
      });
      if (!table) {
        throw new ForbiddenException('access to resourse denied!');
      }
      await this.prisma.table.delete({ where: { id: tableId } });
      console.log(
        `table number: ${table.number} removed by Admin with id: ${user.id}`,
      );
      return 'successfully deleted';
    } else {
      throw new ForbiddenException('access to resource denied!');
    }
  }
}
