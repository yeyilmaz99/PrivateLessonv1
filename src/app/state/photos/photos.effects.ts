import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import {
  loadCertificates,
  loadCertificatesSuccess,
  loadMainPhotos,
  loadMainPhotosSuccess,
  loadPhotos,
  loadPhotosSuccess,
} from './photos.actions';
import { PhotoService } from '../../services/photoService/photo.service';

@Injectable()
export class PhotosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private photosService: PhotoService
  ) {}

  loadMainPhotos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMainPhotos),
      mergeMap((action) => {
        return this.photosService.getMainPhotos().pipe(
          map((response) => {
            const message = response.message;
            const photos = response.data;
            return loadMainPhotosSuccess({ photos });
          })
        );
      })
    );
  });

  loadPhotos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPhotos),
      mergeMap((action) => {
        return this.photosService.getPhotos().pipe(
          map((response) => {
            const message = response.message;
            const photos = response.data;
            return loadPhotosSuccess({ photos });
          })
        );
      })
    );
  });

  loadCertificates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCertificates),
      mergeMap((action) => {
        return this.photosService.getCertificates().pipe(
          map((response) => {
            const message = response.message;
            const certificates = response.data;
            return loadCertificatesSuccess({ certificates });
          })
        );
      })
    );
  });
}
