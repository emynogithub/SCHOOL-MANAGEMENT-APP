import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SchoolClass } from './entities/class-entities.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { QueryClassDto } from './dto/query-class.dto';

@Injectable()
export class ClassService {
    constructor(
    @InjectRepository(SchoolClass)
    private readonly classRepository: Repository<SchoolClass>
    ){}

    async getAllClass(query: QueryClassDto) {
        const { page, limit, search, name } = query;
        const skip = (page - 1) * limit;

        const baseWhere: FindOptionsWhere<SchoolClass> = {};
        if (name) baseWhere.name = name;

        const where: FindOptionsWhere<SchoolClass>[] = [];
        if (search) {
            where.push({ ...baseWhere, name: ILike(`%${search}%`) });
        } else {
            where.push(baseWhere);
        }

        const [classes, total] = await this.classRepository.findAndCount({
            where,
            skip,
            take: limit,
            order: { id: 'ASC' },
        });

        return {
            data: classes,
            total,
            page,
            limit,
            totalpages: Math.ceil(total / limit),
        };
    }

    async getClass(id: number){
        const classs = await this.classRepository.findOne({
          where:{id}
        })
        if(!classs){
            throw new NotFoundException('id not found')
        }

        return classs;
    }

    async createClass(dto: CreateClassDto){
        const existingClass = await this.classRepository.findOne({
            where:{name: dto.name}
        })

        if(existingClass){
            throw new ConflictException('This class already exist')
        }

        const newclass = this.classRepository.create(dto)

        return this.classRepository.save(newclass)


    }

    async updateClass(id: number, dto: CreateClassDto){
        const classs = await this.classRepository.findOne({
            where:{id}
        })
        if(!classs){
            throw new NotFoundException('id not found')
        }

        Object.assign(classs, dto)

        return this.classRepository.save(classs)
    }

    async deleteClass(id: number){
        const classs = await this.classRepository.findOne({
            where:{id}
        })
        if(!classs){
            throw new NotFoundException('id not found')
        }

        return this.classRepository.remove(classs)
    }

    



    
}
