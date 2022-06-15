import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/user';
const stateUrl = 'http://localhost:8080/api/user_stat';
const API_URL = 'http://localhost:8080/api/test/';
const userPrgUrl = 'http://localhost:8080/api/user/user_program';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/all`);
  }
  getAllWithProgram(): Observable<any> {
    return this.http.get(`${baseUrl}/program`);
  }

  // getAll_2(): Observable<any> {
  //     return this.http.get(`${baseUrl}'/all`)};

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  createImage(id, data): Observable<any> {
    return this.http.post(`${baseUrl}/image/user/${id}`, data);
  }
  updateImage(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/image/user/${id}`, data);
  }
  getImage(id): Observable<any> {
    return this.http.get(`${baseUrl}/image/${id}`, {
      responseType: 'blob',
    });
  }
  setStat(userId, data): Observable<any> {
    return this.http.post(`${stateUrl}/${userId}`, data);
  }
  updateState(id, data): Observable<any> {
    return this.http.put(`${stateUrl}/${id}`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByUsername(username): Observable<any> {
    return this.http.get(`${baseUrl}?username=${username}`);
  }
  findByFirstName(first_name): Observable<any> {
    return this.http.get(`${baseUrl}?first_name=${first_name}`);
  }
  findByLastName(last_name): Observable<any> {
    return this.http.get(`${baseUrl}?last_name=${last_name}`);
  }
  createProgram(data): Observable<any> {
    return this.http.post(`${userPrgUrl}`, data);
  }
  getAllProgram(): Observable<any> {
    return this.http.get(`${userPrgUrl}/all`);
  }
  updateProgram(id, data): Observable<any> {
    return this.http.put(`${userPrgUrl}/${id}`, data);
  }
  deleteProgram(userId, programId): Observable<any> {
    return this.http.delete(`${userPrgUrl}/${userId}/${programId}`);
  }
}
