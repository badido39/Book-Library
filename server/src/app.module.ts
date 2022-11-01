import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [MemberModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
