import {
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'


@Injectable()
export class PermissionCheckGuard implements CanActivate {

    constructor(private refelctor: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requiredPermissions : string[] = this.refelctor.get('permissions', context.getHandler()) || []
        if(!requiredPermissions.length){
            return true
        }

        const userPermissions = request.currentUser.permissions
        return (
            userPermissions.some((p: string) => p.includes('all')) ||
            requiredPermissions.every(p => userPermissions.includes(p))
        );
    }
}