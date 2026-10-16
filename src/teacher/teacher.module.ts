import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './Entities/teacher.entity';
import { User } from 'src/user/entities/user.entities';
import { SchoolClass } from 'src/class/entities/class-entities.dto';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher, User, SchoolClass])],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
