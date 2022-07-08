import { Role } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  address: string;

  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsOptional()
  authCode?: number;

  @IsNotEmpty()
  role: Role;
}
