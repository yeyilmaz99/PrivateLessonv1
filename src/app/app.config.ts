import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  RouterModule,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { routes, extraOptions } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { effects, reducers } from './state/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ViewportScroller } from '@angular/common';
import { provideEffects } from '@ngrx/effects';
import { TextEffects } from './state/texts/texts.effects';
import {
  HttpClient,
  HttpHandler,
  provideHttpClient,
} from '@angular/common/http';
import { PhotosEffects } from './state/photos/photos.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideStore(reducers),
    provideStoreDevtools({ maxAge: 25, logOnly: isDevMode() }),
    provideEffects(effects),
    provideHttpClient(),
  ],
};
