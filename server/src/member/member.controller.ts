import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  //                      FIXED
  @Post('signup')
  @ApiProperty()
  signUp(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.signUp(createMemberDto);
  }

  @Post('login')
  @ApiProperty()
  login(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.login(createMemberDto);
  }

  @Get('findAll')
  @ApiProperty()
  findAll() {
    return this.memberService.findAll();
  }

  @Get('user/:id')
  @ApiProperty()
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Patch(':id')
  @ApiProperty()
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: Partial<UpdateMemberDto>,
  ) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiProperty()
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
