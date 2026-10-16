import { CreateStudentDto } from './../student/dto/create.students.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Get, ParseIntPipe ,Param,Patch , Post, Body, Delete, Query, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from './entities/user.entities';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';


@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    
    @Get()
    getUsers(@Query()query: QueryUserDto){
        return this.userService.getUsers(query)
        
    }
    
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){
      return this.userService.getUser(id)
    }
    
    @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe)id: number,@Body() updateUserDto: UpdateUserDto){
        return this.userService.UpdateUser(id, updateUserDto)
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
    @Post()
    createUser(@Body()createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }


}

