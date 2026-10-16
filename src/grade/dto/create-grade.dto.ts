import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";


export class CreateGradeDto {
    @IsNotEmpty()
    @IsInt()
    studentId!: number;

    @IsNotEmpty()
    @IsInt()
    subjectId!: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(100)
    score!: number;

    @IsString()
    @IsNotEmpty()
    semester!: string;

    @IsString()
    @IsNotEmpty()
    academicYear!: string;  


}