import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User{
constructor(
    public status:string,
     ) {}
}
export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registrationURL = 'http://localhost:8080/api/users';

  constructor(private http : HttpClient) {}

   registerUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: headers
    };
    console.log(JSON.stringify(user))
    return this.http.post(this.registrationURL, JSON.stringify(user),options);
   }

    authenticate(username, password) {
      return this.http.post<any>('http://localhost:8080/authenticate',{username,password}).pipe(
         map(
           userData => {
            sessionStorage.setItem('username',username);
            let tokenStr= 'Bearer '+userData.token;
            sessionStorage.setItem('token', tokenStr);
            return userData;
         }
         )
      );
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username')
        //console.log(!(user === null))
        return !(user === null)
    }

    logOut() {
        console.log("logout")
        sessionStorage.removeItem('username')
        console.log("isLoggedin " + this.isUserLoggedIn())
    }
}
