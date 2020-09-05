import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurUser } from '../models/curuser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
      });
  }

  loginUser(email: string, password: string) {
    const user = { email: email, password: password };
    this.http
      .post('http://localhost:3000/api/user/login', user)
      .subscribe(result => {
        console.log(result);
      });
  }
}
