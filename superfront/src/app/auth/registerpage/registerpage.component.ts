import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { UserRest } from 'src/app/_models/userRest';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  email: string;
  password: string;
  repeatedPassword: string;
  registerError: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.registerError = false;
  }

  updateEmail(email) {
    console.log("email: " + email);
    this.email = email;
  }

  updatePassword(password) {
    console.log("password: " + password);
    this.password = password;
  }

  updateRepeatedPassword(repeatedPassword) {
    console.log("repeated: " + repeatedPassword);
    this.repeatedPassword = repeatedPassword;
  }

  registerUser() {
    let user = new UserRest();
    user.email = this.email;
    user.password = this.password;
    user.repeatedPassword = this.repeatedPassword;

    this.authService.registerUser(user).subscribe(
        data => {
            this.router.navigateByUrl('/auth');
        },
        error => {
            this.registerError = true;
        }
    );
  }

  errorOccurred() {
    return this.registerError;
  }

  ngOnInit() {
  }

}
