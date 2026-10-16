import { SchoolClass } from './../class/entities/class-entities.dto';
// import { Enrollment } from 'src/enrollment/dto/create-enrolldto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Enrollment } from './entity/enroll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { CreateEnrollmentDto } from './dto/create-enrolldto';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,

        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,

        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>
    ){}


    async enrollInACourse(dto: CreateEnrollmentDto){
        const student = await this.studentRepository.findOne({ 
            where: { id: dto.studentId },
            relations:  {
                user: true,
                // schoolclass:true,
                // enrollment: true,
            }
        });

        

        if (!student) {
            throw new NotFoundException('student not found');
        }

        const subject = await this.subjectRepository.findOne({ where: { id: dto.subjectId } });

        if (!subject) {
            throw new NotFoundException('subject not found');
        }

        const existingEnrollment = await this.enrollmentRepository.findOne({
            where: {
                student: { id: dto.studentId },
                subject: { id: dto.subjectId },
                semester: dto.semester,
                academicYear: dto.academicYear
            }
        });

        if (existingEnrollment) {
            throw new ConflictException('student already enrolled in this course for the specified semester and academic year');
        }

        const enrollment = this.enrollmentRepository.create({
            student,
            subject,
            semester: dto.semester,
            academicYear: dto.academicYear
        });

        return this.enrollmentRepository.save(enrollment);
    }


    async getAllEnrollments() {
        return this.enrollmentRepository.find({
            relations:{
                student: true, 
                subject: true,
            } 
        })

    
}


   async getEnrollment(id: number){
    const enrollment = await this.enrollmentRepository.findOne({
        where: {id},
        relations:{
            student: true,
            subject: true,
        }
    });

    if(!enrollment){
        throw new NotFoundException("Enrollment not found")
    }

    return enrollment;
   }
}