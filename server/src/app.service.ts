import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('i am clicked from frontend');
    return 'Connected To Server👌!';
  }
}
