import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data1 } from './Models/data';
import { Client } from './Models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
private  LocalhostUrl='http://localhost:58739/api/Client';

  private BaseUrl = 'https://www.xnes.co.il/ClosedSystemMiddlewareApi/api/generalinformation'; 
  constructor(  private http: HttpClient) { }
  /** GET heroes from the server */
getData(): Observable<Data1> {
  return this.http.get<Data1>(this.BaseUrl)
}
addClient(client: Client) {
  return this.http.post(this.LocalhostUrl, client);
}
getList() {
  return this.http.get(this.LocalhostUrl);
}
}
