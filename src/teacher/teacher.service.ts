// import { CreateTeacherDto } from 'src/user/dto/create-user.dto';
import { Teacher } from './Entities/teacher.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entities';
import { UpdateTeacherDto } from './dto/update-Teacher.dto';
import { CreateTeacherDto } from './dto/create-Teacher.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { QueryTeacherDto } from './dto/query-teacher.dto';
import { SchoolClass } from 'src/class/entities/class-entities.dto';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>,


        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(SchoolClass)
        private readonly classRepository: Repository<SchoolClass>
    ){}


    //GET ALL THE TEACHER
    async getTeachers(query: QueryTeacherDto) {
        const { page, limit, search, subject} = query;
        const skip = (page - 1) * limit;

        const subjFilter = subject ? { subject } : {};

        const where: FindOptionsWhere<Teacher>[] = [];
    

        if (search) {
            where.push({user: { name: ILike(`%${search}%`) }, ...subjFilter });
             where.push({user: { email: ILike(`%${search}%`) },...subjFilter });
        
        } else {
            where.push({ ...subjFilter });
        }

        const [teachers, total] = await this.teacherRepository.findAndCount({
            where,
            relations: { user: true },
            skip,
            take: limit,
            order: { id: 'ASC' },
        });

        return {
            data: teachers,
            total,
            page,
            limit,
            totalpages: Math.ceil(total / limit)
        };
    }



       
       async createTeacher( createTeacherDto: CreateTeacherDto
       ){
        const user = await this.userRepository.findOne({
            where: {id: createTeacherDto.userId}
        })

        if(!user){
            throw new NotFoundException('user not found');
        }

        const teacher = this.teacherRepository.create({
            subject: createTeacherDto.subject,
            user,
        });

        return this.teacherRepository.save(teacher);
       }



       //GET A TEACHER

       async getTeacher(id: number){
        const teacher = await this.teacherRepository.findOne({
            where: {id},
            relations:{user: true,classtaught:true}
        })

        if(!teacher){
            throw new NotFoundException('user not found');
        }

        

        return teacher;

       }

        async updateTeacher(id: number , updateTeacherDto: UpdateTeacherDto){
            const teacher = await this.teacherRepository.find({
                where: {id},

            })

            if(!teacher){
            throw new NotFoundException('user not found');

            }

            return this.teacherRepository.save({
                ...teacher,...updateTeacherDto
            })
        }



        async deleteTeacher(id: number){

            const teacher = await this.teacherRepository.find({
                where: {id},

            })

            if(!teacher){
            throw new NotFoundException('user not found');

            }   
            
            await this.teacherRepository.remove(teacher)

        }



        async AddTeacherToClass(teacherId: number , classId: number){

            const classs = await this.classRepository.findOne({
                where:{id: classId},
                relations:{teachers:true}
            })

            console.log(classs)

            if(!classs){
                throw new NotFoundException(`${classId} Not found`)
            }
            const alreadyAssigned =  classs.teachers.some((t) => t.id === teacherId);

            const teacher = await this.teacherRepository.findOne({
                where:{id: teacherId}
            })
            
            
            if(!teacher){
                throw new NotFoundException(`${teacherId} Not found`)
            }
            
            if(alreadyAssigned){
                throw new BadRequestException('Teacher already assigenedto this class')
            }


            classs.teachers.push(teacher)


            return this.classRepository.save(classs)



        }
}