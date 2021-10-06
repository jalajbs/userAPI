import { Injectable, HttpException } from '@nestjs/common';
import { USERS } from './users.mock';
@Injectable()
export class LoginService {
  private users = USERS;

  getUser() {
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((usr) => usr.id === id);
    if (!user) {
      throw new HttpException('Not Found', 404);
    } else return user;
  }

  postUser(user) {
    this.users.push(user);
    return this.users;
  }

  deleteById(id: number) {
    const index = this.users.findIndex((usr) => usr.id === id);
    if (index === -1) {
      throw new HttpException('Not Found', 404);
    }
    this.users.splice(index, 1);
    return this.users;
  }

  //   updateById() {
  //     return;
  //   }
}
