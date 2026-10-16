import { Controller , Get , Body , Post ,Param, Put, Delete, Query, UseGuards} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { QueryClassDto } from './dto/query-class.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/user/entities/user.entities';
import { RolesGuard } from 'src/auth/guard/roles.guard';


@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService){}


        
        @Get()
        async getAllClass(@Query() query: QueryClassDto){
            return this.classService.getAllClass(query)

        }
        @Roles(UserRole.ADMIN)
        @Post()
        async createClass(@Body() dto: CreateClassDto) {
            return this.classService.createClass(dto)

        }


        @Get(':id')
        async getAclass(@Param('id') id: number){
            return this.classService.getClass(id)
        }
        
        @Roles(UserRole.ADMIN)
        @Put(':id')
        async updateClass(@Param('id') id: number, @Body() dto: CreateClassDto){
            return this.classService.updateClass(id, dto)
        }

        @Roles(UserRole.ADMIN)
        @Delete(':id')
        async deleteClass(@Param('id') id: number){
            return this.classService.deleteClass(id)
        }

    
}
