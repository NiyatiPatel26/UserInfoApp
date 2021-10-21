import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:53535/api";

  constructor(private http: HttpClient) { }

  getUserList(): Observable<Array<Object>> {
    return this.http.get<Array<string>[]>(this.APIUrl + '/User');
  }

  getParticularUserData(val): Observable<Array<Object>> {
    return this.http.get<Array<string>[]>(this.APIUrl + '/user/' + val);
  }

  addUser(val) {
    return this.http.post(this.APIUrl + '/User', val);
  }

  updateUser(val) {
    return this.http.put(this.APIUrl + '/User', val);
  }

  deleteUser(val: string) {
    return this.http.delete(this.APIUrl + '/User/' + val);
  }

}
