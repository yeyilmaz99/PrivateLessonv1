import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotosState } from './photos.state';
import { Photo } from '../../models/photoModel';

export const PHOTOS_STATE_NAME = 'photosState';

const getPhotosState = createFeatureSelector<PhotosState>(PHOTOS_STATE_NAME);

export const getAllPhotos = createSelector(getPhotosState, (state) => {
  return state.photos;
});

export const getMainPhotos = createSelector(getPhotosState, (state) => {
  return state.mainPhotos;
});

export const getCertificates = createSelector(getPhotosState, (state) => {
  return state.certificates;
});
