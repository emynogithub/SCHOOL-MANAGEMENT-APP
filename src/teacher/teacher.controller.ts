import { Controller , Get ,Param , Body ,Post, Patch,  UseGuards, Query, ParseIntPipe, Delete} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-Teacher.dto';
import { UpdateTeacherDto } from './dto/update-Teacher.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/user/entities/user.entities';
import { QueryTeacherDto } from './dto/query-teacher.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teacher')
export class TeacherController {
    constructor(private teachersService: TeacherService){}


    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Get()
    getTeachers(@Query() query: QueryTeacherDto) {
        return this.teachersService.getTeachers(query);
    }
    
    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Get(':id')
    getTeacher(@Param('id', ParseIntPipe) id: number){
     return this.teachersService.getTeacher(id)
    }
     
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Post()
    createTeacher(@Body() /*userId: number, subject: string*/ createTeacher: CreateTeacherDto){
      return this.teachersService.createTeacher(createTeacher)
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe)id: number, @Body() updateTeacher: UpdateTeacherDto){
        return this.teachersService.updateTeacher(id, updateTeacher)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    deleteTeacher(@Param('id', ParseIntPipe) id: number){
        return this.teachersService.deleteTeacher(id)
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Patch(':teacherId/classes/:classId')
    AddTeacherToClass(
        @Param('teacherId', ParseIntPipe) teacherId: number,
        @Param('classId', ParseIntPipe) classId: number){

            return this.teachersService.AddTeacherToClass(teacherId, classId)

        }


}
