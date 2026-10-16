import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/class-entities.dto';

@Module({
  imports:[TypeOrmModule.forFeature([SchoolClass])],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
