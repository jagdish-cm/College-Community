import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  reloadComponent() {
    window.location.reload();
  }

  addNotes(
    creator: string,
    topic: string,
    subject: string,
    branch: string,
    semester: number,
    file: File
  ) {
    const notes = new FormData();
    notes.append('creator', creator);
    notes.append('topic', topic);
    notes.append('subject', subject);
    notes.append('branch', branch);
    notes.append('semester', semester.toString());
    notes.append('date', Date.now().toString());
    notes.append('file', file, file.name);
    console.log('notes service ' + notes);
    notes.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    this.http
      .post<{ notes; nid: string }>(
        'http://localhost:3000/api/notes/create',
        notes
      )
      .subscribe(resdata => {
        this.reloadComponent();
      });
  }

  getNotes(): Observable<any> {
    return this.http.get<[]>('http://localhost:3000/api/notes');
  }

  getFile(filename: string) {
    let file = { filename: filename };
    this.http
      .post('http://localhost:3000/api/notes/getfile', file, {
        responseType: 'blob'
      })
      .subscribe((response: any) => {
        //download the file
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  filterRes(filterItems: object) {
    // let s;
    // filterItems.subscribe(result => {
    //   console.log(result);
    //   s = result;
    // });
    console.log(filterItems);
    return this.http.post(
      'http://localhost:3000/api/notes/filter',
      filterItems
    );
  }

  searchEntries(term) {
    console.log(term);
    let search = { search: term };
    return this.http.post('http://localhost:3000/api/notes/search', search);
  }
}
