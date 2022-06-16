import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userAuthControl = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  messageSuccess = '';
  messageError = '';
  isLoginFailed;
  isLoggedIn;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      window.location.replace('/navigation');
    }
  }
  submit(): void {
    if (this.userAuthControl.status == 'VALID') {
      this.authService.login(this.userAuthControl.value).subscribe(
        (data) => {
          console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveRefreshToken(data.refreshToken);
          this.tokenStorage.saveUser(data);

          this.isLoggedIn = true;
          window.location.replace('/navigation');
        },
        (err) => {
          this.messageError = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
}
