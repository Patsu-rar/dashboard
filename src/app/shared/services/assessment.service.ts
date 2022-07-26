import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  assessments: any = [];
  constructor(private http: HttpClient) {
  }

  getAssessments() {
    return this.http.get<User[]>(`${environment.apiUrl}`).pipe(map(el => {
      sessionStorage.setItem('reports', JSON.stringify(el));
      this.assessments = JSON.parse(sessionStorage.getItem('reports')!);
    }));
  }
}
