
import {Column, Entity, JoinColumn, OneToOne, ManyToMany, PrimaryGeneratedColumn, JoinTable} from 'typeorm'
import {User} from '../../user/entities/user.entities'
import { SchoolClass } from 'src/class/entities/class-entities.dto';
import { Subject } from 'src/subject/entities/subject.entity';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    subject!: string;

    // @Column()
    // subjectName!: string;

    @OneToOne(() => User, (user)=> user.teacher ,{onDelete: 'CASCADE'})
    @JoinColumn()
    user!: User;

    @ManyToMany(()=>Subject,(subject)=> subject.teachers)
    subjects!: Subject[]; 

    @ManyToMany(()=> SchoolClass,(schoolclass)=> schoolclass.teachers)
    @JoinTable()
    classtaught!:SchoolClass[];

    
}