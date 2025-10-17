import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak.config';

import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, NZ_DATE_LOCALE, provideNzI18n, vi_VN } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(vi);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#781badff'
  },
  table: {
    nzBordered: true,
  },
  button: {
    nzSize: 'large',
  },
  image: {
    nzDisablePreview: 'true',
  },
  form: {
    nzNoColon: true,
  },
  datePicker: {},
  // empty: {
  //   nzDefaultEmptyContent: NoDataComponent,
  // },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    KeycloakService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: KeycloakBearerInterceptor,
    //   multi: true,
    // },
    provideNzConfig(ngZorroConfig),
    provideNzIcons(icons),
    provideNzI18n(vi_VN),
    { provide: NZ_DATE_LOCALE, useValue: vi },
  ]
};
