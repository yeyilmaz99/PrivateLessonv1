import { createReducer, on } from '@ngrx/store';
import { initialState } from './photos.state';
import {
  loadCertificatesSuccess,
  loadMainPhotosSuccess,
  loadPhotosSuccess,
} from './photos.actions';

const _photosReducer = createReducer(
  initialState,
  on(loadMainPhotosSuccess, (state, action) => {
    return {
      ...state,
      mainPhotos: action.photos,
    };
  }),
  on(loadPhotosSuccess, (state, action) => {
    return {
      ...state,
      photos: action.photos,
    };
  }),
  on(loadCertificatesSuccess, (state, action) => {
    return {
      ...state,
      certificates: action.certificates,
    };
  })
);

export function photosReducer(state: any, action: any) {
  return _photosReducer(state, action);
}
