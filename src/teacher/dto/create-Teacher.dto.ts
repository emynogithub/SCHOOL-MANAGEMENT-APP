import { IsNotEmpty, IsString, IsInt } from "class-validator";



export class CreateTeacherDto{
    @IsString()
    @IsNotEmpty()
    subject!: string;

    @IsInt()
    userId!: number;

}