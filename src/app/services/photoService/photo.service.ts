import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { Photo } from '../../models/photoModel';

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
}
