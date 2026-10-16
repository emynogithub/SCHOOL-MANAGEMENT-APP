import { CreateStudentDto } from './dto/create.students.dto';
import { UpdatedStudentDto } from './dto/update.students.dto';
import { Injectable ,NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entities';
import { QueryStudentDto } from './dto/Query-student.dto';
import { SchoolClass } from 'src/class/entities/class-entities.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,


        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(SchoolClass)
        private readonly classRepository: Repository<SchoolClass>
    ){}

    async getStudents(query: QueryStudentDto) {
        const { page, limit, search, studentClass, username, age } = query;
        const skip = (page - 1) * limit;

        const where: FindOptionsWhere<Student>[] = [];
        
        const classFilter = studentClass ? { studentClass } : {};

        

        if (search) {
            where.push({ studentClass: ILike(`%${search}%`), ...classFilter });
            where.push({ ...classFilter, user: { name: ILike(`%${search}%`) } });
            where.push({ ...classFilter, user: { email: ILike(`%${search}%`) } });
        } 
         else {
            where.push({...classFilter});
        }

        const [students, total] = await this.studentRepository.findAndCount({
            where,
            relations: { user: true , schoolclass: true, enrollment: true},
            skip,
            take: limit,
            order: { id: 'ASC' },
        });

        return {
            data: students,
            total,
            page,
            limit,
            totalpages: Math.ceil(total / limit),
        };
    }
    
    //GET ONE STUDENT
    async getStudent(id: number){
     const student = await this.studentRepository.findOne({
      where: { id },
      relations:{user:true, schoolclass: true, enrollment: true,}
    })
     if(!student) {
        throw new NotFoundException('student not found');
     }

     console.log(student)

     return student;
    }

    //CREATE A STUDENT
    async createStudent(createStudentDto:  CreateStudentDto){

        const user = await this.userRepository.findOne({
            where:{
                id: createStudentDto.userId,
            },
        })

        if(!user){
            throw new NotFoundException('User not Found');
        }
        const student = this.studentRepository.create({
            
            age: createStudentDto.age,
            studentClass: createStudentDto.studentClass,
            user,
        
        })
        
        
        return this.studentRepository.save(student)
    }


    //UPDATE STUDENT

     async updateStudent(id: number, updateStudentDto: UpdatedStudentDto){
        const student = await this.studentRepository.find();

        
    
        Object.assign(student, updateStudentDto);

        return this.studentRepository.save(student);
    }

    //Delete student
    async deleteStudent(id: number){
     const student = await this.getStudent(id);

     if(!student){
        throw new NotFoundException('student Not found!')
     }

     await this.studentRepository.remove(student)
        
     return {
        message:'Student deleted succesfully'
     }
     
    }


    async AssignClass(studentId: number, classId: number ){
        const classs = await this.classRepository.findOne({
            where:{
                id: classId
            }
        })

        const student = await this.studentRepository.findOne({
            where: {
                id: studentId
            }

        })


        if(!classs || !student){
            throw new NotFoundException('Data Not found')
        }

        if(student.schoolclass && student.schoolclass.id === classId){
            throw new NotFoundException('student already exist')

        }

        student.schoolclass = classs

        return this.studentRepository.save(student)

        

    }



}
