import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from '../../models/experienceModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { Observable } from 'rxjs';
import { ExperienceForUpdate } from '../../models/experienceForUpdateDto';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  apiPath = 'https://localhost:44345/api/Experiences';
  constructor(private http: HttpClient) {}

  getExperiences(): Observable<ListResponseModel<Experience>> {
    let newPath = this.apiPath;
    return this.http.get<ListResponseModel<Experience>>(newPath);
  }

  updateExperience(id:number, experience:ExperienceForUpdate):Observable<ResponseModel>{
    let newPath = this.apiPath+ `?id=${id}`;
    return this.http.patch<ResponseModel>(newPath, experience)
  }
}
