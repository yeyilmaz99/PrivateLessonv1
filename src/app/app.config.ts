import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import {
  RouterModule,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async"
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
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}
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
    provideToastr({ timeOut: 2000, positionClass: 'toast-bottom-left' }),
    provideHttpClient(),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    })),
    provideAnimationsAsync()
    
  ]
};
