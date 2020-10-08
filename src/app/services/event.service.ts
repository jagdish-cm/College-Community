import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  reloadComponent() {
    window.location.reload();
  }

  addEvent(
    creator: string,
    title: string,
    description: string,
    dates: Date[],
    time: any,
    files: File[]
  ) {
    const event = new FormData();
    event.append('creator', creator);
    event.append('title', title);
    event.append('description', description);
    let df = dates[0].toString();
    let dt = dates[1].toString();
    event.append('dateFrom', df);
    console.log('dates ' + df + ' ' + dt);
    event.append('dateTo', dt);
    event.append('time', time.toString());
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        event.append('files[]', files[i], files[i].name);
      }
    } else {
      event.append('files[]', null);
    }
    console.log('event service ' + event);
    event.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    this.http
      .post<{ event; eid: string }>(
        'http://localhost:3000/api/event/create',
        event
      )
      .subscribe(resdata => {
        this.reloadComponent();
      });
  }

  getEvents(): Observable<any> {
    return this.http.get<[]>('http://localhost:3000/api/event');
  }
}