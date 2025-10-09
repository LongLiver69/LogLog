import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { createAuthGuard, KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

export const AuthGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  // 1. Kiểm tra Đăng nhập
  const authenticated = keycloakService.isLoggedIn();
  if (!authenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến Keycloak Login
    await keycloakService.login({
      redirectUri: window.location.origin + state.url,
    });
    return false;
  }

  // 2. Lấy Roles yêu cầu từ Route Data
  const requiredRoles: string[] = route.data['roles'] || [];

  if (requiredRoles.length === 0) {
    // Không yêu cầu role cụ thể, cho phép truy cập
    return true;
  }

  // 3. Kiểm tra Role
  const hasRequiredRole = requiredRoles.some(role => 
    keycloakService.isUserInRole(role)
  );

  if (hasRequiredRole) {
    return true;
  } else {
    // Chuyển hướng đến trang Access Denied
    return router.navigate(['/access-denied']);
  }
};

// @Injectable({
//   providedIn: 'root', 
// })
// export class AuthGuard extends KeycloakAuthGuard {
//   constructor(
//     protected override readonly router: Router,
//     protected readonly keycloak: KeycloakService
//   ) {
//     super(router, keycloak);
//   }

//   /**
//    * Phương thức chính để xác định quyền truy cập
//    * @param route ActivatedRouteSnapshot chứa thông tin route và data (bao gồm requiredRoles)
//    * @param state RouterStateSnapshot
//    * @returns Promise<boolean | UrlTree>
//    */
//   public async isAccessAllowed(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Promise<boolean | UrlTree> {
//     // 1. Kiểm tra trạng thái đăng nhập
//     if (!this.authenticated) {
//       // Nếu chưa đăng nhập, chuyển hướng đến trang login của Keycloak
//       await this.keycloak.login({
//         redirectUri: window.location.origin + state.url,
//       });
//       return false;
//     }

//     // 2. Lấy danh sách roles yêu cầu từ cấu hình route (data)
//     const requiredRoles = route.data['roles'] || [];

//     // Nếu không có roles nào được yêu cầu, cho phép truy cập
//     if (!requiredRoles || requiredRoles.length === 0) {
//       return true;
//     }

//     // 3. Kiểm tra phân quyền roles
//     // hasRole() kiểm tra xem người dùng có bất kỳ role nào trong danh sách requiredRoles không
//     const hasRequiredRole = requiredRoles.some((role: string) => 
//       this.keycloak.isUserInRole(role)
//     );

//     if (hasRequiredRole) {
//       return true;
//     } else {
//       // Nếu không có role phù hợp, chuyển hướng đến trang lỗi (ví dụ: 403 Forbidden)
//       this.router.navigate(['/access-denied']);
//       return false;
//     }
//   }
// }