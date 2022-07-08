import { Category, Status } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class editProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageLink?: string;

  @IsOptional()
  category?: Category;

  @IsOptional()
  status?: Status;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  updatedBy?: string;
}
