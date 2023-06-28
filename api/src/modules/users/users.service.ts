import { Injectable } from '@nestjs/common';


@Injectable()
export class UsersService {

  getUserById(userID : string) {
    
    return { userID }
  }
}
