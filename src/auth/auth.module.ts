import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy.';
import { ConfigModule } from 'node_modules/@nestjs/config/dist/config.module';
import { ConfigService } from 'node_modules/@nestjs/config/dist/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],

    inject: [ConfigService],

    useFactory: (configService: ConfigService)=>({
    secret: configService.get<string>('JWT_KEY'),
    signOptions: {
      expiresIn: configService.get<number>('EXPIRES_IN')
    }

  })
  }),

],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
