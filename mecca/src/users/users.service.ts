import { Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { Role } from '../model/role.enum';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
