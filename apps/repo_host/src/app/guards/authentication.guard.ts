import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { KeycloakService } from '../utils/keycloak.service';

// const isAccessAllowed = async (
//   route: ActivatedRouteSnapshot,
//   _: RouterStateSnapshot,
//   authData: AuthGuardData
// ): Promise<boolean | UrlTree> => {
//   debugger
//   const { authenticated, grantedRoles } = authData;
//   const requiredRole = route.data['role'];
//   if (!requiredRole) { 
//     return false;
//   }

//   const hasRequiredRole = (role: string): boolean =>
//     Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

//   if (authenticated && hasRequiredRole(requiredRole)) {    
//     return true;
//   } else {
//     const keycloakService = inject(KeycloakService);
//     await keycloakService.login();
//     return false;
//   }

//   // const router = inject(Router);
//   // return router.parseUrl('/forbidden');
// };

// export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
    
  if (!tokenService.keycloak.token || tokenService.keycloak.isTokenExpired()) {
    
    router.navigate(['/']);
    return false;
  }
  return true;
};