import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { DashboardService } from './dashboard.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  showUser(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update')
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.dashboardService.editUser(userId, dto);
  }
}
