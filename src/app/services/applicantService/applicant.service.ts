import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { Applicant } from '../../models/applicantModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  apiPath = 'https://localhost:44345/api/SMTP';
  constructor(private http: HttpClient) {}

  getApplicants(): Observable<Applicant[]> {
    let newPath = this.apiPath;
    return this.http.get<Applicant[]>(newPath);
  }
}
