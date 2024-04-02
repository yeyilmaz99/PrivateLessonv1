import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { FEndText } from '../../models/textsModel';

@Injectable({
  providedIn: 'root'
})
export class TextsService {
  apiPath = "https://localhost:44345/api/FEndTexts/"
  constructor(private http:HttpClient) { }

  getTexts():Observable<ListResponseModel<FEndText>>{
    let newPath = this.apiPath + "GetAll";
    return this.http.get<ListResponseModel<FEndText>>(newPath)
  }

}
