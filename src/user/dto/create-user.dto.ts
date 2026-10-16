
import { IsEmail, IsNotEmpty,IsString, IsEnum} from "class-validator";

import { UserRole } from "../entities/user.entities";


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name!: string;


    @IsEmail()
    email!:string;

    @IsEnum(UserRole)
    role!:UserRole;

}