import { provideAppInitializer, EnvironmentInjector, inject, makeEnvironmentProviders, runInInjectionContext } from '@angular/core';
import Keycloak from 'keycloak-js';
import {
  AutoRefreshTokenService,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  createKeycloakSignal,
  KEYCLOAK_EVENT_SIGNAL,
  UserActivityService,
  withAutoRefreshToken,
} from 'keycloak-angular';
import { environment } from './environments/environment';

function getValidKeycloakConfig() {
  return environment.keycloakConfig;
}

export const provideKeycloakAngular = () => {
  const config = getValidKeycloakConfig();
  const keycloakInstance: any = new (Keycloak as any)(config);
  const keycloakSignal = createKeycloakSignal(keycloakInstance);

  return makeEnvironmentProviders([
    { provide: KEYCLOAK_EVENT_SIGNAL, useValue: keycloakSignal },
    { provide: Keycloak as any, useValue: keycloakInstance },
    { provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, useValue: [] },
    AutoRefreshTokenService,
    UserActivityService,
    provideAppInitializer(async () => {
      const injector = inject(EnvironmentInjector);
      runInInjectionContext(injector, () => {
        // Nếu cần cấu hình features nâng cao, thêm vào đây
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 60000,
        });
      });
      try {
        await keycloakInstance.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          redirectUri: window.location.origin + '/',
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Keycloak initialization failed', err);
      }
    }),
  ]);
};