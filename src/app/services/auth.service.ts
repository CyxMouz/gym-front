import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username: user.username,
        email: user.email,
        password: user.password,
        user_type: user.user_type,
      },
      httpOptions
    );
  }
  refreshToken(token: string) {
    return this.http.post(
      AUTH_API + 'refreshtoken',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
}
