import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../../models/listResponseModel';
import { Observable } from 'rxjs';
import { Skill, SkillForUpdate } from '../../models/skillModel';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  apiPath = 'https://localhost:44345/api/Skills';
  constructor(private http: HttpClient) {}

  getSkills(): Observable<ListResponseModel<Skill>> {
    let newPath = this.apiPath;
    return this.http.get<ListResponseModel<Skill>>(newPath);
  }

  updateSkill(id:number, skill:SkillForUpdate):Observable<ResponseModel>{
    let newPath = this.apiPath+ `?id=${id}`;
    return this.http.patch<ResponseModel>(newPath, skill)
  }
}
