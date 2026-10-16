
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/Entities/teacher.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class SchoolClass{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(()=> Student, (student)=> student.schoolclass)
    student!: Student;

    @ManyToMany(()=> Teacher, (teacher)=> teacher.classtaught)
    teachers!: Teacher[];
}