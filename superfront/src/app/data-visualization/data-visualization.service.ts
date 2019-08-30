import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { File } from 'src/app/_models/file';

@Injectable({
  providedIn: 'root'
})
export class DataVisualizationService {

  baseUrl:string="http://localhost:3000/api";
  constructor(private http:HttpClient) { }

  /**czy to jest różnica że wybieram od razu file z tych jakby dostępnych setów: z doklejonym categor&goup
  Może jednak stworzyłabym sobie coś takiego jak set "klase" o polach file,category,group
  */


  getSet(id:number){
    return this.http.get(this.baseUrl+'/set/${id}');
  }
}
