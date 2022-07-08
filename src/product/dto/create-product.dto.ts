import { Category, Status } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class createProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageLink: string;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  status: Status;

  @IsNumber()
  @IsOptional()
  price?: number;
}
