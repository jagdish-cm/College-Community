import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsgnService {
  constructor(private http: HttpClient) {}

  addAsgn(
    creator: string,
    title: string,
    description: string,
    deadline: Date,
    sem: string,
    branch: string,
    subject: string,
    files: File[]
  ): Observable<any> {
    const assignment = new FormData();
    assignment.append('creator', creator);
    assignment.append('title', title);
    assignment.append('description', description);
    let dl = deadline.toString();
    assignment.append('deadline', dl);
    assignment.append('sem', sem);
    assignment.append('branch', branch);
    assignment.append('subject', subject);
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        assignment.append('files[]', files[i], files[i].name);
      }
    } else {
      assignment.append('files[]', null);
    }
    console.log('assignment service ' + assignment);
    assignment.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    return this.http.post<{ assignment; aid: string }>(
      'http://localhost:3000/api/asgn/create',
      assignment
    );
  }

  getAsgn(branch, semester) {
    console.log(branch + ' ------ ' + semester);
    return this.http.get<any>(
      `http://localhost:3000/api/asgn/getStudentAsgn?branch=${branch}&semester=${semester}`
    );
  }

  getFacAsgns() {
    return this.http.get<any>('http://localhost:3000/api/asgn/facAsgns');
  }

  submitAsgn(asgnId: string, studentId: string, files: File[], text: string) {
    const assignment = new FormData();
    assignment.append('studentId', studentId);
    assignment.append('text', text);
    assignment.append('asgnId', asgnId);
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        assignment.append('files[]', files[i], files[i].name);
      }
    } else {
      assignment.append('files[]', null);
    }
    return this.http.post<any>(
      'http://localhost:3000/api/asgn/submitByStudent',
      assignment
    );
  }

  getStudentNames(id) {
    return this.http.get<any>(
      'http://localhost:3000/api/asgn/studentNames/' + id
    );
  }
}
