import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryType } from '../entities/Category';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  @IsEnum(CategoryType)
  type: CategoryType;
}
