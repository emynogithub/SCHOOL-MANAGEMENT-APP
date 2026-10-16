
import { PartialType } from "@nestjs/mapped-types";
import { CreateTeacherDto } from './create-Teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto){}