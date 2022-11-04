import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create/:id')
  @ApiProperty()
  create(@Body() createProfileDto: CreateProfileDto, @Param('id') id: string) {
    return this.profileService.create(createProfileDto, id);
  }

  @Get()
  @ApiProperty()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiProperty()
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  @ApiProperty()
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @ApiProperty()
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
