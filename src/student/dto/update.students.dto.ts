import {PartialType} from '@nestjs/mapped-types';
import { CreateStudentDto } from './create.students.dto';


export class UpdatedStudentDto extends
PartialType(CreateStudentDto){}