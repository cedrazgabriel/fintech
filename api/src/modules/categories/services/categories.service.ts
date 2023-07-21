import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findyMany({
      where: { userId },
    });
  }

  create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name, icon, type } = createCategoryDto;

    return this.categoriesRepo.create({
      data: {
        userId,
        name,
        icon,
        type,
      },
    });
  }
}
