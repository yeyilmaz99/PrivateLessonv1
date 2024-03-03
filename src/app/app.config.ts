import { ApplicationConfig, isDevMode } from '@angular/core';
import { RouterModule, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes, extraOptions } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers } from './state/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ViewportScroller } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})), provideStore(reducers), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
