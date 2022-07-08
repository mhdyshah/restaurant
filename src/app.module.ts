import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TablesModule } from './tables/tables.module';
import { ProductModule } from './product/product.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [AuthModule, PrismaModule, TablesModule, ProductModule, DashboardModule],
})
export class AppModule {}
