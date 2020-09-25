import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnnounceService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  reloadComponent() {
    window.location.reload();
  }

  addAnnounce(
    creator: string,
    title: string,
    description: string,
    time: any,
    files: File[]
  ) {
    const announcement = new FormData();
    announcement.append('creator', creator);
    announcement.append('title', title);
    announcement.append('description', description);
    announcement.append('time', time.toString());
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        announcement.append('files[]', files[i], files[i].name);
      }
    } else {
      announcement.append('files[]', null);
    }
    this.http
      .post<{ announce; aid: string }>(
        'http://localhost:3000/api/announce/create',
        announcement
      )
      .subscribe(resdata => {
        this.reloadComponent();
      });
  }
}
