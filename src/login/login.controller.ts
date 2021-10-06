import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { usersDTO } from './users.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get()
  getUser() {
    return this.loginService.getUser();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.loginService.getUserById(id);
  }

  @Post()
  postUser(@Body() user: usersDTO) {
    return this.loginService.postUser(user);
  }

  @Delete()
  deleteById(@Param('id') id: number) {
    return this.loginService.deleteById(id);
  }
}
