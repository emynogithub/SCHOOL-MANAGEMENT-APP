import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>
    ){}



        async createSubject(dto: CreateSubjectDto){
            const subject = this.subjectRepository.create(dto)
            return await this.subjectRepository.save(subject)
        }

        async getAllSubject(){
            return await this.subjectRepository.find()
        }

        async getSubject(id: number){
            return await this.subjectRepository.findOneBy({id})
        }

        async updateSubject(id: number, dto: CreateSubjectDto){
            const subject = await this.subjectRepository.findOneBy({id})
            if(!subject){
                return null
            }
            Object.assign(subject, dto)
            return await this.subjectRepository.save(subject)
        }

        async deleteSubject(id: number){
            const subject = await this.subjectRepository.findOneBy({id})
            if(!subject){
                return null
            }
            return await this.subjectRepository.remove(subject)
        }
}
