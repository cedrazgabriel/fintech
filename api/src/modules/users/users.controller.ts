import { Controller, Get, Req, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Req() request : any){
    
    console.log({meuUserId: request.userID})
    
    return this.usersService.getUserById('userID')
  }
}
