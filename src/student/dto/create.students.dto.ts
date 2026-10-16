import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min} from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm/browser";


export class CreateStudentDto {
    @PrimaryGeneratedColumn()
    id!: number;
    // @Transform (({value}) => (typeof value === 'string' ? value.trim() : value))
    // @IsString()
    // @IsNotEmpty()
    // name!: string;

    // @IsString()
    // @Transform (({value}) => (typeof value === 'string' ? value.trim() : value))
    // @IsNotEmpty()
    // email!: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    age!: number;

    @IsString()
    @Transform (({value}) => (typeof value === 'string' ? value.trim() : value))
    @IsNotEmpty()
    studentClass!: string;


    @IsInt()
    @Min(1)
    userId!: number;
}