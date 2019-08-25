import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from 'src/app/_models/file';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

   baseURL = 'http://localhost:3000/file';

   constructor(private http : HttpClient) {}

   getFiles(){
          return this.http.get<Array<object>>(this.baseURL);
       }

   addFile(file){
          let req = new HttpRequest('POST',this.baseURL,file,{
           reportProgress:true
           });
      return this.http.request(req);
   }

}
