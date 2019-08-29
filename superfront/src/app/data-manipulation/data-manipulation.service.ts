import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {File } from 'src/app/_models/file';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  constructor(private http: HttpClient) { }

  baseUrl: string="api/files";

  getFiles(){
  }

  getCategories(){
  }

  getGroups(){
  }

  getFileId(){
  }

  getCategoryId(){
  }

  getGroupId(){
  }
}
