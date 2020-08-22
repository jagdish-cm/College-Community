import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faBook,
  faBell,
  faTasks,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  faHome = faHome;
  faBook = faBook;
  faBell = faBell;
  faTasks = faTasks;
  faUser = faUser;
}
