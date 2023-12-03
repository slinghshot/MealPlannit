import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authorization } from '../interfaces/authorization';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean = false;
  name: string = '';
  // private apiAuth = 'http://127.0.0.1:3000/api/v1/auth';
  private apiAuth = 'http://api.mealplannit.com:3000/api/v1/auth';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Authorization> {
    let headers = new HttpHeaders();
    // let body = new
    headers.append('Content-Type', 'application/json');
    let body = {
      email: email,
      password: password,
    };

    return this.http.post<Authorization>(`${this.apiAuth}/login`, body, {
      headers: headers,
    });
  }
  register(
    name: string,
    email: string,
    password: string
  ): Observable<Authorization> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let body = {
      name: name,
      email: email,
      password: password,
    };
    return this.http.post<Authorization>(`${this.apiAuth}/register`, body, {
      headers: headers,
    });
  }

  checkIfToken() {
    var token = localStorage.getItem('token');
    this.userLoggedIn = token ? true : false;
  }

  getName(): string {
    let name: string = '';
    if (this.userLoggedIn) {
      var token = localStorage.getItem('token');
      if (token) {
        var decoded: any = jwtDecode(token);
        name = decoded.name;
      }
    }
    return name;
  }

  // STORE the token in localstore:
  setToken(token: string) {
    // First, serialize it (but just if token is not string type).
    // const tokenString: string = JSON.stringify(token);
    // const tokenString: string = token;

    localStorage.setItem('token', token);
  }

  // READ the token from localstorage and Deserialize
  getToken(): string | null {
    let token = localStorage.getItem('token');

    // if (token != null) {
    //   // You just need to parse if you serialized it inside setToken() method
    //   token = JSON.parse(token);
    // }

    return token;
  }

  signOut() {
    if (this.userLoggedIn) {
      localStorage.removeItem('token');
      this.checkIfToken();
    }
  }
}
