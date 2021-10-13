import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { usersDTO } from './users.dto';

@Injectable()
export class UserService {
  private users = UserEntity;

  getUserById(id: number): Promise<UserEntity> {
    const user = this.users.findOne(id);
    return user;
  }

  getEmailForToken(email: string) {
    const user = this.users.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async addUser(users: usersDTO) {
    const user = this.users.create(users);
    await user.save();

    delete user.password;
    return user;
  }

  async findOne(id: string) {
    const user = this.users.findOne(id);
    return user;
  }

  // deleteUserById(id: number) {
  //   const index = this.users.findOne(id);
  //   this.users.splice(index, 1);
  //   return this.users;
  // }
}
