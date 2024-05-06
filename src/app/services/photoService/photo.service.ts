import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { Photo, PhotoForUpdate } from '../../models/photoModel';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  apiPath = 'https://localhost:44345/api/Photos/';
  constructor(private http: HttpClient) {}

  getMainPhotos(): Observable<ListResponseModel<Photo>> {
    let newPath = this.apiPath + 'GetMain?isMain=true';
    return this.http.get<ListResponseModel<Photo>>(newPath);
  }

  getPhotos(): Observable<ListResponseModel<Photo>> {
    let newPath = this.apiPath + 'GetAll';
    return this.http.get<ListResponseModel<Photo>>(newPath);
  }

  getCertificates(): Observable<ListResponseModel<Photo>> {
    let newPath = this.apiPath + 'GetCertificates';
    return this.http.get<ListResponseModel<Photo>>(newPath);
  }

  updatePhoto(id:number, formData:FormData):Observable<ResponseModel>{
    let newPath = this.apiPath + `?id=${id}`;
    return this.http.patch<ResponseModel>(newPath, formData);
  }
}
