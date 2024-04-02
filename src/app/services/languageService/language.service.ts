import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../../models/listResponseModel';
import { Observable } from 'rxjs';
import { Language } from '../../models/languageModel';

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
}
