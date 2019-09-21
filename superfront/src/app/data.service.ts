import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Point } from './_models/point';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  baseURL = 'http://localhost:8080';

  constructor(private http : HttpClient) {}

  getPoints():Observable<Point[]> {
  return this.http.get<Point[]>(this.baseURL + '/points');

  }
}
