// import { request } from 'supertest';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/user/entities/user.entities";
import { ROLES_KEY } from "../decorator/roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){}


    canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles){
        return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if(!user){
        return false;
    }

    return requiredRoles.includes(user.role)
    }
}