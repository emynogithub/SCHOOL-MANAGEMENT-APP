
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, ILike } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
import { QueryUserDto } from './dto/query-user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async createUser(createUserDto: CreateUserDto){
        const user = this.userRepository.create(createUserDto);

        return this.userRepository.save(user);
    }


    

    async getUser(id :number){
     const user = await this.userRepository.findOne({
        where: {id}
     })

     if(!user){
        throw new NotFoundException('user not found')
     }

     

     const {password, ...safeUsers} = user

     return safeUsers;


    }

    async UpdateUser(id: number,updateUser: UpdateUserDto){
       const user = await this.userRepository.findOne({
        where:{id}
       });

       if (!user) {
         return null;
       }

       Object.assign(user, updateUser);

       return this.userRepository.save(user);
    }

    //DELETE USER!

    async deleteUser(id: number){
        const user = await this.userRepository.findOne({
        where:{id}
       });

        if (!user) {
         return null;
       }

       await this.userRepository.remove(user)

       return{
        message: `User deleted succesfully`,
       };


    }

     async getUsers(query: QueryUserDto){

        const {page, limit ,search , role} = query;

         const skip = (page - 1) * limit;

        const rolefilter = role? {role}: {};

        const where: FindOptionsWhere<User>[] = []

        if(search){
             where.push({name: ILike(`%${search}%`), ...rolefilter});
            where.push({email: ILike(`%${search}%`), ...rolefilter});

        }else{
            where.push({...rolefilter})

        }
       

        const [user, total] = await this.userRepository.findAndCount({
            where,
            skip,
            take: limit,
            order: {id: 'ASC'}
        })


        const safeUser = user.map((u)=>{

            const { password, ...rest} = u
            return rest;

        })
        return {
            data: safeUser,
            total,
            page,
            limit,
            totalpages: Math.ceil(total/limit)
        }


        
    }  

    

}
