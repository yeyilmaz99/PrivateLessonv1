import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { Education } from '../../models/educationModel';

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
}
