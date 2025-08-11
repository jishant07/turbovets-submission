import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChild, GuardResult, MaybeAsync } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild  {
    
    private router = inject(Router)

    canActivateChild(childRoute: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
        const requiredRoles = childRoute.data['requiredRoles'] as string[] | undefined;
        const userData = JSON.parse(localStorage.getItem('userInformation') || '{}');
        const isAuthenticated = !!localStorage.getItem('token')
        if (!isAuthenticated) {
            return this.router.navigate(['/login']);
        }

        if (requiredRoles && requiredRoles.length > 0) {
            
            // TODO: Give Granular permission check

            const hasPermission = requiredRoles.includes(userData.role)
            if (!hasPermission) {
                return this.router.navigate(['/forbidden']);
            }
        }

        return true;
    }
}
