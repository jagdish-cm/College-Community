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
export class TutorialsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  reloadComponent() {
    window.location.reload();
  }

  addTutorial( tutorial : Object) : Observable<any>{
    let newTutorial = tutorial;
    return this.http.post('http://localhost:3000/api/tutorials/create', newTutorial);
  }

  getTutorials(): Observable<any> {
    return this.http.get<[]>('http://localhost:3000/api/tutorials');
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  searchEntries(term) {
    console.log(term);
    let search = { search: term };
    return this.http.post('http://localhost:3000/api/tutorials/search', search);
  }

  filterRes(filterItems: object) {
    console.log(filterItems);
    return this.http.post(
      'http://localhost:3000/api/tutorials/filter',
      filterItems
    );
  }

  deleteTutoial(id: string) : Observable<any> {
    return this.http
      .delete('http://localhost:3000/api/tutorials/' + id);
  }

}