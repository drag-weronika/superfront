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
  errorText: string[];
  doubledLogin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.errorText = []
    this.doubledLogin = false
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
    this.doubledLogin = false;

    this.authService.registerUser(user).subscribe(
        data => {
            this.errorText = []
            this.router.navigateByUrl('/auth');
        },
        error => {
            this.errorText = []
            if (error.error.errors != null) {
                for (let e of error.error.errors) {
                    switch(e.code) {
                        case "ValidEmail": {
                            this.errorText.push("*Provided email has invalid format")
                            break;
                        }
                        case "ValidPassword": {
                            this.errorText.push("*Password must contain at least 8 characters including small and big letters, a number and  a special character.")
                            break;
                        }
                        case "PasswordMatches": {
                            this.errorText.push("*Repeated password must match the one above!")
                            break;
                        }
                    }
                }
            } else if (error.error == 'Registration Failed') {
                this.doubledLogin = true;
            }
        }
    );
  }

  ngOnInit() {
  }

}
