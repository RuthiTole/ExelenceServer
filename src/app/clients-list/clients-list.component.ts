import { Component, OnInit } from '@angular/core';
import { Client } from '../Models/client';
import { ClientService } from '../client.service';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  clients:Client[];
  constructor(private clientservice: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }
  getClients(): void {
    this.clientservice.getList().subscribe((res:any)=>{
      this.clients=res
    }, (error: any) => {
      console.log(error)
    }); 
  }
}
