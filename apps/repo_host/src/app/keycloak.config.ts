import { AutoRefreshTokenService, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, provideKeycloak, UserActivityService, withAutoRefreshToken } from 'keycloak-angular';
import { environment } from './environments/environment';

function getValidKeycloakConfig() {
  return environment.keycloakConfig;
}

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: getValidKeycloakConfig(),
    initOptions: {
      onLoad: 'check-sso', // 'login-required' , 'check-sso'
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      redirectUri: window.location.origin + '/'
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
     providers: [
      AutoRefreshTokenService,
      UserActivityService,
    ]
  });