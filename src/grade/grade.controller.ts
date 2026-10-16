import { Controller , Post ,Body, Param , Get, UseGuards} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserRole } from 'src/user/entities/user.entities';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('grade')
export class GradeController {
    constructor(
        private readonly gradeService: GradeService
    ){}

    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Post()
    async recordGrades(@Body() dto: CreateGradeDto){ 
        return await this.gradeService.recordGrades(dto)

    }
    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Get(':studentId')
    getGradesByStudentId(@Param('studentId') studentId: number){
        return this.gradeService.getGradeByStudentId(studentId)
  }


  @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Get(":subjectId")
    getGradeBySubjectId(@Param('subjectId') subjectId: number){
        return this.gradeService.getGradeBySubject(subjectId)
    }


    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Get()
        getAllGrades(){
        return this.gradeService.getAllGrades()
            
    }

}