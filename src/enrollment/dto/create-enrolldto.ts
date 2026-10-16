
import { IsNotEmpty, IsString, Min , IsInt} from "class-validator";



export class CreateEnrollmentDto{
    @Min(1)
    @IsInt()
    studentId!: number;

     @Min(1)
    @IsInt()
    subjectId!: number;

    @IsString()
    @IsNotEmpty()
    semester!: string;

    @IsString()
    @IsNotEmpty()
    academicYear!: string;



}