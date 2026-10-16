

import { Subject } from "src/subject/entities/subject.entity";
import { Student } from "src/student/entities/student.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn()
    id!: number;  

    @ManyToOne(()=> Student, {nullable: false})
    student!: Student;

    @ManyToOne(()=> Subject)
    subject!: Subject;

    @Column()
    semester!: string; 

    @Column()
    academicYear!: string;

    @CreateDateColumn()
    enroledAt!: Date;

    
  
  
}