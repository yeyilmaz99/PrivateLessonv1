import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { FETextToUpdateDto, FEndText } from '../../models/textsModel';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TextsService {
  apiPath = "https://localhost:44345/api/FEndTexts"
  constructor(private http:HttpClient) { }

  getTexts():Observable<ListResponseModel<FEndText>>{
    let newPath = this.apiPath + "/GetAll";
    return this.http.get<ListResponseModel<FEndText>>(newPath)
  }

  updateTexts(id:number, text:FETextToUpdateDto):Observable<ResponseModel>{
    let newPath = this.apiPath+ `?id=${id}`;
    console.log(id,text);
    return this.http.patch<ResponseModel>(newPath, text)
  }

}
