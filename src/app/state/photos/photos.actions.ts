import { createAction, props } from '@ngrx/store';
import { Photo, PhotoForUpdate } from '../../models/photoModel';

export const LOAD_MAIN_PHOTOS = '[Photos] Load Main Photos';
export const LOAD_MAIN_PHOTOS_SUCCESS = '[Photos] Load Main Photos Success';

export const LOAD_CERTIFICATES = '[Certificates] Load Certificates';
export const LOAD_CERTIFICATES_SUCCESS =
  '[Certificates] Load Certificates Success';

export const LOAD_PHOTOS = '[Photos] Load Photos';
export const LOAD_PHOTOS_SUCCESS = '[Photos] Load Photos Success';

export const UPDATE_PHOTO = '[Photos] Update Photo';
export const UPDATE_PHOTO_SUCCESS = '[Photos] Update Photo Success';

export const updatePhoto = createAction(UPDATE_PHOTO, props<{id:number,formData:FormData}>())
export const updatePhotoSuccess = createAction(UPDATE_PHOTO_SUCCESS)

export const loadMainPhotos = createAction(LOAD_MAIN_PHOTOS);
export const loadMainPhotosSuccess = createAction(
  LOAD_MAIN_PHOTOS_SUCCESS,
  props<{ photos: Photo[] }>()
);

export const loadPhotos = createAction(LOAD_PHOTOS);
export const loadPhotosSuccess = createAction(
  LOAD_PHOTOS_SUCCESS,
  props<{ photos: Photo[] }>()
);

export const loadCertificates = createAction(LOAD_CERTIFICATES);
export const loadCertificatesSuccess = createAction(
  LOAD_CERTIFICATES_SUCCESS,
  props<{ certificates: Photo[] }>()
);
