import * as bcrypt from 'bcryptjs';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Req,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { usersDTO } from './users.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class UserController {
  constructor(
    private userService: UserService,
    public jwtService: JwtService,
  ) {}

  @Get('user/:id')
  getUserById(@Param('id') id: number) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  // register user
  @Post('user')
  AddUser(@Body() users: usersDTO) {
    return this.userService.addUser(users);
  }

  // login User
  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    //check user email
    const loginUser = await this.userService.getEmailForToken(email);

    if (!loginUser) {
      throw new BadRequestException('invalid user');
    }

    //compare encrypted password
    const loggedinUserPassword = await bcrypt.compare(
      password,
      loginUser.password,
    );

    if (!loggedinUserPassword) {
      throw new BadRequestException('invalid user');
    }

    const id = loginUser.id;
    const payload: jwt.JwtPayload = { id };

    const token = this.jwtService.sign(payload);
    // response.cookie('jwt', token);
    // return token;
    return {
      message: 'Success',
      data: {
        jwt: token,
      },
    };
  }

  //check validation
  @Get('user')
  async getUser(@Req() request: Request) {
    try {
      const auth = request.headers.authorization;
      const token = auth.split(' ')[1];
      const data = await jwt.verify(token, 'UserApiSecretKey');
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = this.userService.findOne(<string>data['id']);

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  //logout
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.removeHeader('jwt');
    response.clearCookie('jwt');
    return {
      message: 'Success',
    };
  }
}
