import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { User } from 'src/user/entities/user.entities';
import { SchoolClass } from 'src/class/entities/class-entities.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User, SchoolClass])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
