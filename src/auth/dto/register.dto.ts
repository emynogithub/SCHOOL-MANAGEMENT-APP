import { IsEmail, IsNotEmpty, IsString, MinLength , IsEnum} from "class-validator";

import { UserRole } from "src/user/entities/user.entities";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name!: string;


    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password! : string;


    @IsEnum(UserRole)
    role!: UserRole;
}