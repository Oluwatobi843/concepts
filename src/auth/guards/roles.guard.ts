import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorators";




@Injectable()
export class RolesGuard implements CanActivate{


  // Reflector => utility that will help to acess metadat
  constructor(private reflector : Reflector){}


  canActivate(context: ExecutionContext): boolean  {

    // retrive the roles metadata set by the role decorator 

      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY, [
          context.getHandler(), //method level metadata
          context.getClass()  // class level metadata
        ]
      );

      if(!requiredRoles){
        return true 
      }

      const {user} = context.switchToHttp().getRequest();

      if(!user){
        throw new ForbiddenException('User no authenticated')
      }

      const hasRequiredRole =  requiredRoles.some(role=> user.role === role);

      if(!hasRequiredRole){
        throw new ForbiddenException('Insufficient permission')
      }

      return true
  }
}