import {  Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    handleRequest(err: any, user: any, info: any) {
        if(err || !user){
            if(info?.message === 'TokenExpiredError') {
                throw new UnauthorizedException('Your access token has expired')
            }

            if(info?.message === 'No auth token') {
                throw new UnauthorizedException('No access token expired');
            }

            throw new UnauthorizedException('Invalid access token')

            
        }
        return user;
        
    }


    
}