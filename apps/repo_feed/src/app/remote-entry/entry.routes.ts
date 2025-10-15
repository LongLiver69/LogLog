import { Route } from '@angular/router';
import { HomeContent } from '../components/home-content/home-content';

export const remoteRoutes: Route[] = [
  { 
    path: '', 
    component: HomeContent
  }
];
