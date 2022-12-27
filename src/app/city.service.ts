import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private  LocalhostUrl='http://localhost:58739/api/Cities';

   
  constructor(  private http: HttpClient) { }


getList() {
  return this.http.get(this.LocalhostUrl);
}
}
