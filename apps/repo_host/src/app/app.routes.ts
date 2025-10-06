// import { canActivateAuthRole } from './guards/authentication.guard';
import { authGuard } from './guards/authentication.guard';
import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'repo_feed',
    loadChildren: () => import('repo_feed/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'repo_chat',
    loadChildren: () => import('repo_chat/Routes').then((m) => m!.remoteRoutes),
    // canActivate: [canActivateAuthRole],
    // data: { role: 'longtest' },
    canActivate: [authGuard]
  },
  {
    path: '',
    component: NxWelcome,
  },
];
