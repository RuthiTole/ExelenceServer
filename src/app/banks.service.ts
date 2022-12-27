import { Injectable } from '@angular/core';
import { Data1 } from './Models/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  private BaseUrl = 'https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation'; 
  constructor(  private http: HttpClient) { }
  /** GET heroes from the server */
getData(): Observable<Data1> {
  return this.http.get<Data1>(this.BaseUrl)
}
}
