import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '../tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config.service';
import { TasksController } from '../tasks/tasks.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { JunctionModule } from '../junction/junction.module';
import { OrganisationModule } from '../organisation/organisation.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    JunctionModule,
    OrganisationModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h', }
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
