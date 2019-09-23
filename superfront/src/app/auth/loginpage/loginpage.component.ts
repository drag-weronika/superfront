import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  email: string;
  password: string;
  loginError: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.logOut();
    this.loginError = false;
  }

  updateEmail(email) {
    console.log("email: " + email);
    this.email = email;
  }

  updatePassword(password) {
    console.log("password: " + password);
    this.password = password;
  }

  login() {
    console.log("LOGIN!!!!")

    this.authService.authenticate(this.email, this.password).subscribe(
        r => {
            if (r.token) {
                this.router.navigateByUrl('/data-import');
            }
        },
        error => {
            this.loginError = true
         }
    );
  }

  errorOccurred() {
    return this.loginError;
  }

  ngOnInit() {
  }

}
