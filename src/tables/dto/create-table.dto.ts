import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTableDto {
  @IsNotEmpty()
  number: number;

  @IsOptional()
  imageLink?: string;

  createdBy: string;
}
