import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  constructor(
    private tokenStorageService: TokenStorageService,
    private socketService: SocketService
  ) {}
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.socketService.setupSocketConnection(
        this.tokenStorageService.getUser()
      );
      const user = this.tokenStorageService.getUser();

      this.username = user.first_name + ' ' + user.last_name;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
  }
}
