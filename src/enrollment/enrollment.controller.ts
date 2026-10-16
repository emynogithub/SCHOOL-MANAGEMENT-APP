import { Controller, Get, Param, Post , Body, UseGuards} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrolldto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserRole } from 'src/user/entities/user.entities';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';


@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('enrollment')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}


    @Roles(UserRole.ADMIN,UserRole.STUDENT)
    @Post()
    async enrollInACourse(@Body() dto: CreateEnrollmentDto) {
        return this.enrollmentService.enrollInACourse(dto);
    }

    @Roles(UserRole.ADMIN)
    @Get()
    async getAllEnrollments() {
        return this.enrollmentService.getAllEnrollments();
    }

    @Roles(UserRole.ADMIN, UserRole.TEACHER,UserRole.STUDENT)
    @Get(':id')
    async getEnrollment(@Param('id') id: number) {
        return this.enrollmentService.getEnrollment(id);
    }
}
