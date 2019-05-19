import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { tokenKey } from '@angular/core/src/view';
import { environment } from '../../environments/environment';
import { EmailValidator } from '@angular/forms';
// A service is an AngularJS class intended to inject data from backend to frontend

const BACKEND_URL = environment.apiURL + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userID: string;
  private role: string;
  private authStatusListener = new Subject<boolean>();
  private redirect_url: string;
  private error = new Subject;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserID() {
    return this.userID;
  }

  getRole() {
    return this.role;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  resetPassword(email: string) {
    const authData = {
      email: email
    };

    this.http.post(BACKEND_URL + '/reset', authData)
      .subscribe(response => {
        if (response === 404) {
          console.log('error');
        } else {
          console.log(response);
        }
      });
  }

  createUser(email: string, first_name: string, last_name: string, password: string, role: string) {
    const authData: AuthData = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
      role: role
    };
    console.log(authData);

    this.http.post(BACKEND_URL + '/signup', authData)
      .subscribe(response => {
        // this.login(authData.email, authData.password);
        if (authData.role === 'donor') {
          this.router.navigate(['/donor']);
        } else if (authData.role === 'agency') {
          this.router.navigate(['/agency']);
        } else {
          this.router.navigate(['/login']);
        }
      },
        error => {
          console.log(error);
          if (error.error.message) {
            // this.router.navigate(['/login', {error: error.error.message}]);
            this.router.navigate(['/'], { queryParams: { error: error.error.message } });
          }
        });
  }

  login(email: string, password: string, redirect_url: string) {
    const authData = {
      email: email,
      password: password,
    };
    this.redirect_url = redirect_url;

    this.http.post<{ token: string, expiresIn: number, userID: string, role: string }>(BACKEND_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        const userID = response.userID;
        const role = response.role;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userID = response.userID;
          this.role = response.role;
          this.authStatusListener.next(true);
          const now = new Date;
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userID, this.role);
          if (this.redirect_url !== '') {
            this.router.navigateByUrl(this.redirect_url);
          } else if (this.role.toUpperCase() === 'INVESTOR') {
            this.router.navigate(['/dashboard/investor']);
          } else if (this.role.toUpperCase() === 'MANAGER') {
            this.router.navigate(['/dashboard/manager']);
          } else if (this.role.toUpperCase() === 'AGENT') {
            this.router.navigate(['/dashboard/agent']);
          }
        }
      },
        error => {
          if (error.error.message) {
            this.error.next([...error.error.message]);
          }
        }
      );

  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userID = null;
    this.role = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userID = authInfo.userID;
      this.role = authInfo.role;
      this.setAuthTimer(expiresIn / 1000); // this divisio is because setTimeout works with miliseconds
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userID: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userID', userID);
    localStorage.setItem('role', role);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userID = localStorage.getItem('userID');
    const role = localStorage.getItem('role');
    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userID: userID,
      role: role
    };
  }

  getErrorListener() {
    return this.error.asObservable();
  }
}
