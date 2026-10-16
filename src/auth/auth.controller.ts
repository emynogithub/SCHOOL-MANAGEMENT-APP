import { AuthService } from './auth.service';
import { Controller, Get ,Injectable,Req, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Body, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { UserRole } from 'src/user/entities/user.entities';
import { Roles } from './decorator/roles.decorator';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    async register(@Body() registerDto: RegisterDto){
      return this.authService.register(registerDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.authService.Login(loginDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req()req: any){
        return req.user

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('admin')
    adminOnly(@Req() req: any)
    {
        return req.user
    

    }


}
