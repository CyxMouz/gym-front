import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/program';
const progExoUrl = 'http://localhost:8080/api/exercise/exercise_program';
@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getByName(name): Observable<any> {
    return this.http.get(`${baseUrl}/${name}`);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  createProgramExercise(id, data): Observable<any> {
    return this.http.post(`${progExoUrl}/${id}`, data);
  }
  getProgramExercise(id): Observable<any> {
    return this.http.get(`${progExoUrl}/findByProgram/${id}`);
  }
  getAllWithExercise(): Observable<any> {
    return this.http.get(`${progExoUrl}/findAll`);
  }
  updateProgramExercise(id, data): Observable<any> {
    return this.http.put(`${progExoUrl}/program/${id}`, data);
  }
  deleteProgramExercise(id): Observable<any> {
    return this.http.delete(`${progExoUrl}/program/${id}`);
  }
}
