import { Student } from 'src/student/entities/student.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Grade } from './entity/grade.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Subject } from 'src/subject/entities/subject.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradeService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,

        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,

        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>
    ){}


        async recordGrades(dto: CreateGradeDto) {
            const student =  await this.studentRepository.findOne({
                where: {id:dto.studentId}
            })

            if(!student){
                throw new NotFoundException("student not found")
            }

            const subject = await this.subjectRepository.findOne({
                where: { id:dto.subjectId}
            })

            if(!subject){
                throw new NotFoundException("subject not found")
            }

            const existingGrade = await this.gradeRepository.findOne({

                where:{
                    student:{ id: dto.studentId},
                    subject:{id: dto.subjectId},
                    score: dto.score,
                    semester: dto.semester,
                    academicYear: dto.academicYear

                }
            })

            if(existingGrade){  
                throw new NotFoundException("grade already exists for this student in this subject for the specified semester and academic year")
            }

            const grade = this.gradeRepository.create({
                student,
                subject,
                score: dto.score,
                semester: dto.semester,
                academicYear: dto.academicYear
            })

            return this.gradeRepository.save(grade)
        }

        async getGradeByStudentId(studentId: number){
            return this.gradeRepository.find({
                where:{
                    student:{id: studentId}
                    
                },

                // relations:{
                //     student: true
                // }
            })




        }

        async getGradeBySubject(subjectId: number){
            return this.gradeRepository.find({
                where: {
                    subject: {id: subjectId}
                },
                relations: {student: true}
            })

            
        }

        async getAllGrades(){
           const grade = this.gradeRepository.find({
                relations: {student: true, subject: true}
        })

        return grade;
        
        


        }







    
         
    }  



