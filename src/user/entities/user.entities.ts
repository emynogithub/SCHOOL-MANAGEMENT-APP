import { Exclude } from 'class-transformer';
import { Student } from './../../student/entities/student.entity';
// import { Student } from "src/student/entities/student.entity";
import { Teacher } from 'src/teacher/Entities/teacher.entity';
import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";


export enum UserRole{
    STUDENT = 'student',
    TEACHER = 'Teacher',
    ADMIN = 'admin'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    email!: string;

    @Exclude()
    @Column({ select: false})
    password!: string;

   @Column({
    type: 'enum',
    enum: UserRole,
   })

   role!: UserRole;

   @OneToOne(()=> Student, (Student) => Student.user)
   student!:Student;

   @OneToOne(()=> Teacher, (teacher)=> teacher.user)
   teacher!: Teacher;


}
