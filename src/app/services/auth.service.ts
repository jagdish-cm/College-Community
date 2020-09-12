import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurUser } from '../models/curuser.model';
import {
  Subscriber,
  Subject,
  AsyncSubject,
  ReplaySubject,
  Observable
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private atoken: string;
  private curUser = new Subject<CurUser>();
  private cUser;
  private authStatus = new Subject<boolean>();
  private isLog: boolean = false;

  getToken() {
    return this.atoken;
  }

  authSubsListner() {
    return this.authStatus.asObservable();
  }

  isLogged() {
    return this.isLog;
  }

  createUser(
    batchFrom: Date,
    batchTo: Date,
    enrolNo: string,
    name: string,
    mobile: string,
    email: string,
    branch: string,
    password: string
  ) {
    const regUser: CurUser = {
      _id: null,
      name: name,
      branch: branch,
      enrolNo: enrolNo,
      password: password,
      email: email,
      batchFrom: batchFrom,
      batchTo: batchTo,
      mobile: mobile
    };
    this.http
      .post('http://localhost:3000/api/user/signup', regUser)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/login']);
      });
  }

  setCurUserInfo(): Observable<any> {
    console.log('here');
    return this.http
      .get('http://localhost:3000/api/user/getCurUserInfo')
      .pipe();
    // .subscribe(user => {
    //   console.log('geting user info');
    //   this.cUser = user;
    //   this.curUser.next(this.cUser);
    //   console.log(this.cUser);
    // });
  }

  getCurUser() {
    return this.cUser;
  }

  loginUser(email: string, password: string) {
    const user = { email: email, password: password };
    this.http
      .post<{ token: string }>('http://localhost:3000/api/user/login', user)
      .subscribe(result => {
        const token = result.token;
        this.atoken = token;
        if (this.atoken) {
          this.isLog = true;
          this.authStatus.next(true);
          this.curUser.next(this.cUser);
          this.saveAuthData(token);
          this.router.navigate(['/']);
        }
      });
  }

  distributeCurUserInfo() {
    return this.curUser.asObservable();
  }

  logout() {
    this.atoken = null;
    this.isLog = false;
    this.authStatus.next(false);
    this.removeAuthData();
    this.router.navigate(['/']);
  }

  saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  removeAuthData() {
    localStorage.removeItem('token');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return token;
  }

  autoAuthUser() {
    const authToken = this.getAuthData();
    if (authToken) {
      this.atoken = authToken;
      this.isLog = true;
      this.setCurUserInfo();
      this.curUser.next(this.cUser);
      this.authStatus.next(true);
    }
  }
}
