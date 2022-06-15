import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/exercise';
const muscleUrl = 'http://localhost:8080/api/muscle';
const ExerciseImage_Url = 'http://localhost:8080/api/exercise_image';
@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  createImage(id, data): Observable<any> {
    return this.http.post(`${ExerciseImage_Url}/${id}`, data);
  }
  getImage(id): Observable<any> {
    return this.http.get(`${ExerciseImage_Url}/${id}`, {
      responseType: 'blob',
    });
  }
  getAllImage(): Observable<any> {
    return this.http.get(`${ExerciseImage_Url}`);
  }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }
  getAllFromProgram(data): Observable<any> {
    return this.http.get(`${baseUrl}/list`, { params: { data } });
  }
  getAllNotInSelectedProgam(data): Observable<any> {
    return this.http.get(`${baseUrl}/excludeExercises`, { params: { data } });
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
    return this.http.delete(`${baseUrl}/deleteAll`);
  }
  getAllMuscle(): Observable<any> {
    return this.http.get(`${muscleUrl}`);
  }
}
