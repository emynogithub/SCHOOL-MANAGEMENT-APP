import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "src/student/entities/student.entity";
import { Subject } from "src/subject/entities/subject.entity";



@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student,{ eager: true})
    student!: Student;
    
    @ManyToOne(() => Subject, { eager: true}) 
    subject!: Subject;

    @Column("decimal", { precision: 5, scale: 2 })
    score!: number;
    
    @Column()
    semester!: string;

    @Column()
    academicYear!: string;

    @CreateDateColumn()
    createdAt!: Date;


}