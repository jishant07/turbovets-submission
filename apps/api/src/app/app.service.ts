import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit{
  
  onModuleInit() {
    console.log("APP MODULE INIT")
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
