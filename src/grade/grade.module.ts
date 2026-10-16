import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { Grade } from './entity/grade.entity';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { Subject } from 'src/subject/entities/subject.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Student, Subject])],
  providers: [GradeService],
  controllers: [GradeController]
})
export class GradeModule {}
