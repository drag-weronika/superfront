import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

   baseURL = 'http://localhost:3000';

   constructor(private http : HttpClient) {}

   public uploadFile( file: File ): Observable<any> {
      return this.http.post(this.baseURL+'uploaded', file );
   }
}
