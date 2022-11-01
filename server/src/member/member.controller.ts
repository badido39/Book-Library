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

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  //                      FIXED
  @Post('signup')
  signUp(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.signUp(createMemberDto);
  }

  @Post('login')
  login(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.login(createMemberDto);
  }

  @Get('findAll')
  findAll() {
    return this.memberService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberDto: Partial<UpdateMemberDto>,
  ) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
