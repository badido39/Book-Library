import { Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { Role } from '../model/role.enum';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string) {
    const user = this.prisma.user
      .findUnique({ where: { username } })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e.message;
      });
    return user;
  }

  async getAllUsers() {
    const users = this.prisma.user
      .findMany()
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e.message;
      });
    return users;
  }
}
