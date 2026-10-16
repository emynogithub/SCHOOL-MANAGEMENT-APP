
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { SubjectModule } from './subject/subject.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { GradeModule } from './grade/grade.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>({
     type: 'postgres',
     host: config.get<string>('DB_HOST'),
     port: config.get<number>('DB_PORT'),
     username: config.get<string>('DB_USER'),
     password: config.get<string>('DB_PASSWORD'),
     database:config.get<string>('DB_NAME'),


     autoLoadEntities: true, 
     synchronize: true

      })
    }),
    

    
    
   UserModule, StudentModule, TeacherModule, AuthModule, ClassModule, SubjectModule, EnrollmentModule, GradeModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}

