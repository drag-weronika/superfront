import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class DataImportService {

   baseURL = 'http://localhost:8080/api/files';

   constructor(private http : HttpClient) {}

   getFiles(){
       return this.http.get<File[]>(this.baseURL);
   }

   addFile(file){
       let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       let options = {
             headers: headers
          };
    console.log(JSON.stringify(file))
     return this.http.post(this.baseURL, JSON.stringify(file),options);
   }


}
