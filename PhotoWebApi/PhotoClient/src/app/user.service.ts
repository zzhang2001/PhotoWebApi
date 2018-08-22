import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginViewModel, RegisterViewModel } from './viewmodels';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public static readonly TOKEN_KEY: string = 'JwtToken';
  public static readonly LOGIN_URL: string = 'api/Auth/Login';
  public static readonly REGISTER_URL: string = 'api/Auth/Register';
  public Email: string = '';
  public SignedIn: boolean = false;
  public sessStorage: any = null;
  public heads: HttpHeaders;

  constructor(private http: HttpClient) {
    if (window) {
      this.sessStorage = window.sessionStorage;
    }
  }

  SetRequestOptions() {
    this.heads = new HttpHeaders();
    this.heads = this.heads.set('Content-Type', 'application/json; charset=utf-8');
  }

  // Login user.
  Login(loginViewModel: LoginViewModel): Observable<string> {
    this.SetRequestOptions();
    return this.http.post<string>(UserService.LOGIN_URL, loginViewModel, { headers: this.heads });
  }

  // Register user.
  Register(registerViewModel: RegisterViewModel): Observable<string> {
    this.SetRequestOptions();
    return this.http.post<string>(UserService.REGISTER_URL, registerViewModel, { headers: this.heads });
  }

  Logout(): void {
    this.sessStorage.removeItem(UserService.TOKEN_KEY);
    this.SetUserFromToken();
  }

  // Save token to session storage.
  saveToken(token: string): void {
    this.sessStorage.setItem(UserService.TOKEN_KEY, token);
  }

  // Get token from session storage and set Email and SignedIn properties.
  SetUserFromToken(): void {
    let jwtToken: string | null = this.sessStorage.getItem(UserService.TOKEN_KEY);
    if (jwtToken != null) {
      this.Email = JSON.parse(atob(jwtToken.split('.')[1]))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      this.SignedIn = true;
    } else {
      this.Email = '';
      this.SignedIn = false;
    }
  }
}
