import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class DataImportService {

   baseURL = 'http://localhost:3000/file';

   constructor(private http : HttpClient) {}

   getFiles(){
       return this.http.get<File[]>(this.baseURL);
   }

   addFile(file){
       let req = new HttpRequest('POST',this.baseURL,file,{
       reportProgress:true
       });
     return this.http.request(req);
   }


}
