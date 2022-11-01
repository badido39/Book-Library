import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Member } from '@prisma/client/';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as argon2 from 'argon2';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto) {
    const hash: string = await CryptPassword(createMemberDto.password);
    //FEATURES:CREATE HASH PASSWORD

    const hashSalt = 'hashSalt';
    const member = await this.prisma.member
      .create({
        data: {
          username: createMemberDto.username,
          hash: hash,
          hashSalt: hashSalt,
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

    return member;
  }

  findAll() {
    return this.prisma.member.findMany();
  }

  async findOne(id: string) {
    const member: Member = await this.prisma.member
      .findUnique({ where: { id } })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });

    return member;
  }

  async update(id: string, updateMemberDto: Partial<CreateMemberDto>) {
    const hash: string = await CryptPassword(updateMemberDto.password);
    //FEATURES:CREATE HASH PASSWORD

    const hashSalt = 'hashSalt';

    //FEATURES:CREATE HASH PASSWORD
    const updatedMember = await this.prisma.member.update({
      where: { id },
      data: { hash, hashSalt },
    });

    return updatedMember;
  }

  async remove(id: string) {
    const memeberToDelete = await this.findOne(id)
      .then((res) => res)
      .catch((e) => e);
    await this.prisma.member
      .delete({ where: { id } })
      .then((res) => res)
      .catch((e) => {
        return e;
      });
    return memeberToDelete;
  }
}

const CryptPassword = async (password: string): Promise<string> => {
  const hash = await argon2
    .hash(password)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
  return hash;
};
