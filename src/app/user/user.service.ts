import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserRegistry, Login } from './user.model';
import { Observable } from 'rxjs';
import { UserLogin } from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const loginHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Login: '',
    Password: '',
  }),
};

const requestBody = {
  Name: '',
  Surname: '',
  Email: '',
  UserType: 'STANDARD',
  Password: '',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRegistryUrl: string;
  private userLoginUrl: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.userRegistryUrl = 'https://localhost:5001/api/users/register'; 
    this.userLoginUrl = 'https://localhost:5001/api/users/login';
  }

  registerUser(userRegistry: UserRegistry): Observable<UserRegistry> {
    requestBody.Email = userRegistry.email;
    requestBody.Name = userRegistry.name;
    requestBody.Surname = userRegistry.surname;
    requestBody.Password = userRegistry.password;

    return this.http.post<UserRegistry>(this.userRegistryUrl, requestBody);
  }
  loginUser(userLogin: UserLogin): Observable<Login>{
    loginHttpOptions.headers = loginHttpOptions.headers.set('Login', userLogin.email);
    loginHttpOptions.headers = loginHttpOptions.headers.set('Password', userLogin.password);

    return this.http.post<Login>(this.userLoginUrl, '', loginHttpOptions);
  }
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('jwtToken');

    return !this.jwtHelper.isTokenExpired(token);
  }
}
