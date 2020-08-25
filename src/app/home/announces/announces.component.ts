import { Component, OnInit } from '@angular/core';
import { faCircle, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.scss']
})
export class AnnouncesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  faCircle = faCircle;
  faVolumeUp = faVolumeUp;
  list = [1, 2, 3, 4, 5];
  acontent = 'this is the firs sfdf dsfsdf t dafgasf dfsa sdfas dfas sdffa';
  adate = Date.now();
}
