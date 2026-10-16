import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/entities/user.entities';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService
        
    ){}


    async register(registerDto: RegisterDto){
        const existingUser = await this.userRepository.findOne({
            where: {email: registerDto.email}
        })

        if(existingUser){
            this.logger.warn(`user ${registerDto.email} already exist`)
            throw new ConflictException('Email already exist')
        }
        

        const hashedpassword = await bcrypt.hash(
            registerDto.password, 10
        );


        const user = this.userRepository.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedpassword,
            role: registerDto.role
        });


        const savedUser = await this.userRepository.save(user)

        this.logger.log(
            `User created successfully:${savedUser.id}`
        )

        return{
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
        
        }
    }



    async Login(loginDto: LoginDto){
        const user = await this.userRepository.findOne({
            where:{
                email: loginDto.email
            },
            select:{password: true}

        })

        console.log(user)


        if(!user){
            throw new UnauthorizedException('Invalid email or password!')
        }


        const passwordMatches = await bcrypt.compare(loginDto.password, user.password)

        if(!passwordMatches){
         throw new UnauthorizedException('Invalid email or password')
        }

        const payload = { 
            sub: user.id,
            email: user.email,
            role: user.role
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return{

            accessToken
        }

        

    }

    

}
