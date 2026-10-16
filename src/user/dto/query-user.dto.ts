import { Type } from "class-transformer";
import {  IsOptional, IsString, IsEnum } from "class-validator";
import { PaginationDto } from "src/utils/dto/pagination.dto";
import { UserRole } from "../entities/user.entities";



export class QueryUserDto extends PaginationDto{

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    username?: string;
 
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole

    
}




    
