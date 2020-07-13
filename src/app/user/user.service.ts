import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserRegistry, LoginResponse, DeleteResponse, User } from './user.model';
import { Observable, of } from 'rxjs';
import { UserLogin } from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const loginHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    login: '',
    password: '',
  }),
};
const authenticationHeader = {
  headers: new HttpHeaders({
    authorization: ''
  })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRegistryUrl: string;
  private userLoginUrl: string;
  private userDeleteUrl: string;
  private helper = new JwtHelperService();
  public user$: Observable<User>;

  constructor(private http: HttpClient) {
    this.userRegistryUrl = 'https://localhost:5001/api/users/register';
    this.userLoginUrl = 'https://localhost:5001/api/users/login';
    this.userDeleteUrl = 'https://localhost:5001/api/users/';
  }

  registerUser(userRegistry: UserRegistry): Observable<UserRegistry> {
    return this.http.post<UserRegistry>(this.userRegistryUrl, userRegistry);
  }
  loginUser(userLogin: UserLogin): Observable<LoginResponse>{
    loginHttpOptions.headers = loginHttpOptions.headers.set('Login', userLogin.email);
    loginHttpOptions.headers = loginHttpOptions.headers.set('Password', userLogin.password);

    return this.http.post<LoginResponse>(this.userLoginUrl, '', loginHttpOptions);
  }
  deleteUser(email: string): Observable<DeleteResponse>{
    authenticationHeader.headers = authenticationHeader.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('jwtToken'));
    return this.http.delete<DeleteResponse>(this.userDeleteUrl + email, authenticationHeader);
  }
  isAuthorized(): boolean{
    const token = sessionStorage.getItem('jwtToken');
    return !this.helper.isTokenExpired(token);
  }
  loadUser(): void{
    const token = sessionStorage.getItem('jwtToken');
    const user = token ? this.helper.decodeToken(token) : null;
    if (user){
      this.user$ = of(user);
    }
  }
}
