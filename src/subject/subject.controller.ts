import { Controller, Param, Post , Get , Body , Put , Delete, UseGuards} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserRole } from 'src/user/entities/user.entities';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Roles(UserRole.ADMIN, UserRole.TEACHER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subject')
export class SubjectController {
    
    constructor(private readonly subjectService: SubjectService) {}

    @Roles(UserRole.ADMIN)
    @Post()
    async createSubject(@Body() dto: CreateSubjectDto) {
        return this.subjectService.createSubject(dto);
    }
    
    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Get()
    async getAllSubject() {
        return this.subjectService.getAllSubject();
    }
    
    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Get(':id')
    async getSubject(@Param('id') id: number) {
        return this.subjectService.getSubject(id);
    }

    @Roles(UserRole.ADMIN)
    @Put(':id')
    async updateSubject(@Param('id') id: number, @Body() dto: CreateSubjectDto) {
        return this.subjectService.updateSubject(id, dto);
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async deleteSubject(@Param('id') id: number) {
        return this.subjectService.deleteSubject(id);
    }
}
