import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  private authStatus: Subscription;
  isLoggedIn: boolean = false;

  isCollapsed = false;
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    this.authStatus = this.authService
      .authSubsListner()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.authService.logout();
  }
}
