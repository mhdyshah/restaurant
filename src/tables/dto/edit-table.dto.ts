import { IsOptional } from 'class-validator';

export class EditTableDto {
  @IsOptional()
  number?: number;

  @IsOptional()
  imageLink?: string;

  @IsOptional()
  updatedBy?: string;
}
