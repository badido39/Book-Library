import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async create(createProfileDto: CreateProfileDto, memberId: string) {
    const profile = await this.prisma.profile

      .create({
        data: {
          memberId: memberId['id'],
          firstName: createProfileDto.firstName,
          lastName: createProfileDto.lastName,
          email: createProfileDto.email,
          address: createProfileDto.address,
          tel: createProfileDto.tel,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });

    return profile;
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
