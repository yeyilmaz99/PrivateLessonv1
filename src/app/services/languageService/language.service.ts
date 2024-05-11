import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../../models/listResponseModel';
import { Observable } from 'rxjs';
import { Language, LanguageForUpdate } from '../../models/languageModel';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  apiPath = 'https://localhost:44345/api/Languages';
  constructor(private http: HttpClient) {}

  getLanguages(): Observable<ListResponseModel<Language>> {
    let newPath = this.apiPath;
    return this.http.get<ListResponseModel<Language>>(newPath);
  }


  
  updateLanguage(id:number, language:LanguageForUpdate):Observable<ResponseModel>{
    let newPath = this.apiPath+ `?id=${id}`;
    return this.http.patch<ResponseModel>(newPath, language)
  }
}
