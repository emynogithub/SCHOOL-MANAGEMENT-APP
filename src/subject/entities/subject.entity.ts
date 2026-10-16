
import { Enrollment } from "src/enrollment/entity/enroll.entity";
import { Teacher } from "src/teacher/Entities/teacher.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Subject{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    subjectName!: string
    
    @OneToMany(()=> Teacher,(teacher)=>teacher.subject)
    
    teachers!:Teacher[];  


    @OneToMany(()=> Enrollment,(enroll)=> enroll.subject)
    enrollment!: Enrollment[]; 
    
    
}