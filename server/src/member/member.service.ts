import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Member } from '@prisma/client/';
import { CreateMemberDto } from './dto/create-member.dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async signUp(createMemberDto: CreateMemberDto) {
    const hash: string = await CryptPassword(createMemberDto.password);
    const member = await this.prisma.member
      .create({
        data: {
          username: createMemberDto.username,
          hash: hash,
        },
      })
      .then((res) => {
        console.log(res);
        delete res.hash;
        return res;
      })
      .catch((e: PrismaClientKnownRequestError) => {
        if (e.code === 'P2002') {
          throw new HttpException(
            'Credential Already Taken',
            HttpStatus.CONFLICT,
          );
        }
        return JSON.stringify(e.message);
      });
    return member;
  }

  async login(loginDto: CreateMemberDto) {
    const auth = await this.prisma.member
      .findFirst({
        where: {
          username: loginDto.username,
        },
      })
      .then(async (res) => {
        if ((await ValidatePassword(loginDto.password, res.hash)) == true) {
          return JSON.stringify('Login Succsufful');
        }

        throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
    return auth;
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

    //FEATURES:CREATE HASH PASSWORD
    const updatedMember = await this.prisma.member.update({
      where: { id },
      data: { hash },
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

const ValidatePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return argon2.verify(hash, password).then((argon2Match) => {
    if (argon2Match) {
      return argon2Match;
    }
  });
};
