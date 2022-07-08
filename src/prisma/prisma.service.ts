import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
    console.log(`connected to DB : ${config.get('DATABASE_URL')}`);
  }

  cleanDB() {
    return this.$transaction([
      this.product.deleteMany(),
      this.user.deleteMany(),
      this.table.deleteMany(),
    ]);
  }
}
