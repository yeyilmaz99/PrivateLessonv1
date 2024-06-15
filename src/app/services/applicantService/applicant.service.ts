import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { Applicant,  MailDto } from '../../models/applicantModel';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../models/responseModel';

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

  setApplicant(mail:MailDto):Observable<ResponseModel>{
    let newPath = this.apiPath;
    console.log(mail);
    return this.http.post<ResponseModel>(newPath,mail);  
  }
}
