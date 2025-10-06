
// import { KeycloakService } from 'keycloak-angular';
// import { environment } from './environments/environment';

// function getValidKeycloakConfig() {
//   return environment.keycloakConfig;
// }

// export function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       config: getValidKeycloakConfig(),
//       initOptions: {
//         onLoad: 'check-sso',
//         silentCheckSsoRedirectUri:
//           window.location.origin + '/silent-check-sso.html',
//       },
//       bearerExcludedUrls: [
//         '/assets'
//       ],
//     }).then(() => {
//       console.log('Keycloak initialized successfully');
//     }).catch(err => {
//       console.error('Keycloak initialization failed', err);
//     });
// }