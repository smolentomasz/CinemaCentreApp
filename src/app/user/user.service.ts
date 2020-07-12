import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserRegistry, LoginResponse } from './user.model';
import { Observable } from 'rxjs';
import { UserLogin } from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const loginHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    login: '',
    password: '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRegistryUrl: string;
  private userLoginUrl: string;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.userRegistryUrl = 'https://localhost:5001/api/users/register';
    this.userLoginUrl = 'https://localhost:5001/api/users/login';
  }

  registerUser(userRegistry: UserRegistry): Observable<UserRegistry> {
    return this.http.post<UserRegistry>(this.userRegistryUrl, userRegistry);
  }
  loginUser(userLogin: UserLogin): Observable<LoginResponse>{
    loginHttpOptions.headers = loginHttpOptions.headers.set('Login', userLogin.email);
    loginHttpOptions.headers = loginHttpOptions.headers.set('Password', userLogin.password);

    return this.http.post<LoginResponse>(this.userLoginUrl, '', loginHttpOptions);
  }
  isAuthorized(): boolean{
    const token = sessionStorage.getItem('jwtToken');
    return !this.helper.isTokenExpired(token);
  }
}
