import { Controller, UseGuards, Request, Get, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/model/role.enum';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get_profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all_Users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  /* @HasRoles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  onlyUser(@Request() req) {
    return req.user;
  } */
}
