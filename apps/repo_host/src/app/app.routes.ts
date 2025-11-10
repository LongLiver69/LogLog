import { AuthGuard } from '../../../../libs/core/src/lib/guards/authentication.guard';
import { Route } from '@angular/router';
import { MainLayoutComponent } from '@loglog-libs/core'

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('repo_feed/Routes').then((m) => m!.remoteRoutes),
    canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: 'repo_feed',
    //     loadChildren: () => import('repo_feed/Routes').then((m) => m!.remoteRoutes),
    //   },
    // ]
  },
  {
    path: 'repo_chat',
    component: MainLayoutComponent,
    loadChildren: () => import('repo_chat/Routes').then((m) => m!.remoteRoutes),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'usertest'] },
  },
];
