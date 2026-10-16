// import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinColumn } from "typeorm/browser";
import { User } from "src/user/entities/user.entities";
import { SchoolClass } from "src/class/entities/class-entities.dto";
import { Enrollment} from "src/enrollment/entity/enroll.entity";

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id!: number;

    // @Column()
    // name!: string;

    // @Column()
    // email!: string;

    @Column()
    age!: number;

    @Column()
    studentClass!: string;

    @OneToOne(()=> User,(user)=> user.student,{onDelete: 'CASCADE'})
    @JoinColumn()
    user!:User;

    @ManyToOne(()=> SchoolClass, (schoolclass) => schoolclass.student)
    @JoinColumn()
    schoolclass!: SchoolClass

    // @ManyToOne(()=> Student, {nullable: false})
    // student!: Student;

    @OneToOne(()=> Enrollment, (enrollment) => enrollment.student)
    enrollment!: Enrollment;
} 