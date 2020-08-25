import { Component, OnInit } from '@angular/core';
import { faCircle, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  faCircle = faCircle;
  faCalendarAlt = faCalendarAlt;
  list = [1, 2, 3];
  econtent = 'this is the firs t dafgasf dfsa sdfas dfas sdffa';
  esdate = Date.now();
  eedate = Date.now();
}
