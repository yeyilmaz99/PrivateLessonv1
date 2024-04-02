import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../../models/listResponseModel';
import { Observable } from 'rxjs';
import { Skill } from '../../models/skillModel';

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
}
