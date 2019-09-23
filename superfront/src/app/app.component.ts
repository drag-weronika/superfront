import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'superfront';

  constructor(private authService: AuthService) {
  }

  isLogged() {
    return this.authService.isUserLoggedIn();
  }

  logOut() {
    this.authService.logOut();
  }
}
