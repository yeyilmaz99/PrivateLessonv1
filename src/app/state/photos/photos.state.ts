import { Photo } from '../../models/photoModel';

export interface PhotosState {
  photos: Photo[];
  mainPhotos: Photo[];
  certificates: Photo[];
}

export const initialState: PhotosState = {
  photos: [],
  mainPhotos: [],
  certificates: [],
};
