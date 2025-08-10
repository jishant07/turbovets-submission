import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '../tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config.service';
import { TasksController } from '../tasks/tasks.controller';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
