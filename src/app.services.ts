import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hey There! Sowham here , Thanks for visiting my rest API site';
  }
}