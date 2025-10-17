import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { ChatView } from '../components/chat-view/chat-view';

export const remoteRoutes: Route[] = [{ path: '', component: ChatView }];
