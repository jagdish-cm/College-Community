import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  list = [1, 2, 3];
  econtent = 'this is the firs t dafgasf dfsa sdfas dfas sdffa';
  esdate = Date.now();
  eedate = Date.now();
}
