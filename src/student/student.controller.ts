import { Controller, Get, Param, Post ,Body, Patch, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create.students.dto';
import { UpdatedStudentDto } from './dto/update.students.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { QueryStudentDto } from './dto/Query-student.dto';
import { UserRole } from 'src/user/entities/user.entities';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Roles(UserRole.ADMIN)
    @Get()
    getStudents(@Query() query: QueryStudentDto){
        return this.studentService.getStudents(query);

    }
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Get(':id')
    getStudent(@Param('id') id: string){
        return this.studentService.getStudent(Number(id))
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Post()
    createStudent(@Body() createStudentDto: CreateStudentDto){
      return this.studentService.createStudent(createStudentDto) 

    }

    @Roles(UserRole.ADMIN,UserRole.STUDENT)
    @Patch(':id')
    updateStudent(
        @Param('id') id: string,
        @Body() updateStudent: UpdatedStudentDto,)
    { 
       return this.studentService.updateStudent(
        Number(id),
        updateStudent
       )
    }
     
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Patch(':studentId/class/:classId')
    async assignclass(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('classId', ParseIntPipe) classId: number

    ){
        return this.studentService.AssignClass(studentId, classId)
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    DeleteStudent(@Param('id') id:string){
        return this.studentService.deleteStudent(Number(id))

        
    }
}
