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
import { CreateTableDto, EditTableDto } from './dto';
import { TablesService } from './tables.service';

@UseGuards(JwtGuard)
@Controller('tables')
export class TablesController {
  constructor(private tablesService: TablesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  showTables(@Req() req: Request) {
    return this.tablesService.showTables();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  showTable(@Param('id', ParseIntPipe) tableId: number) {
    return this.tablesService.showTable(tableId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createTable(@Body() dto: CreateTableDto, @GetUser('id') userId: number) {
    return this.tablesService.createTable(dto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('edit/:id')
  editTable(
    @Param('id', ParseIntPipe) tableId: number,
    @Body() dto: EditTableDto,
    @GetUser('id') userId: number,
  ) {
    return this.tablesService.editTable(tableId, dto, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  removeTable(
    @Param('id', ParseIntPipe) tableId: number,
    @GetUser('id') userId: number,
  ) {
    return this.tablesService.removeTable(tableId, userId);
  }
}
