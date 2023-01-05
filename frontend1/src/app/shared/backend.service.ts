import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country, User} from "./tables";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl = 'http://localhost:3001/';
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'x-api-key': '9y2ejg09szvfasyoexyg9ytkbe1o6z'
  }

  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getAllCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.baseUrl + 'countries')
  }
}

