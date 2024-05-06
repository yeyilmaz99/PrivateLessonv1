import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { Education } from '../../models/educationModel';
import { ResponseModel } from '../../models/responseModel';
import { EducationForUpdate } from '../../models/educationForUpdate';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  apiPath = 'https://localhost:44345/api/Educations';
  constructor(private http: HttpClient) {}

  getEducations(): Observable<ListResponseModel<Education>> {
    let newPath = this.apiPath;
    return this.http.get<ListResponseModel<Education>>(newPath);
  }

  updateEducation(id:number, education:EducationForUpdate):Observable<ResponseModel>{
    let newPath = this.apiPath+ `?id=${id}`;
    return this.http.patch<ResponseModel>(newPath, education)
  }
}
