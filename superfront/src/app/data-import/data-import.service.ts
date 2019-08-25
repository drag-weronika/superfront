import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class DataImportService {

constructor (private http: HttpClient){}

baseUrl: string="api/files";

postFile( ){
}


}
