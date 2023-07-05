import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  getUserById(userID: string) {
    return this.usersRepo.findUnique({
      where: { id: userID },
      select: {
        name: true,
        email: true,
      },
    });
  }
}
