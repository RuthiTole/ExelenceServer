import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ClientService } from '../client.service';
import { BanksService } from '../banks.service';
import { CityService } from '../city.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Data } from '../Models/alldata';
import { Banks } from '../Models/Banks';
import { BankBranches } from '../Models/BankBranches';
import { Client } from '../Models/client';
import { City } from '../Models/city';
@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.scss']
})
export class LogupComponent implements OnInit {

alldata:Partial< Data> ={};
   banks: Banks[]=[];
   cities:City[]=[];
   branches: BankBranches[]=[];
   disableTextbox =  true;
   identity:any;
   selectedCity={city_name:'',city_code:0};
   selectedBranch={BankCode :0,
     BranchNumber:0,
     BranchName :'',  }
   selectedLevel={ Code :0,
     Description:'',
     Status :''};
     registerClient:Client=new Client;
     accountValid:string='';
     accountError:boolean=false;
    account_number1:string=''
     name_Hebrew:string='';
     NameHValid:string='';
     NameHError:boolean=false;
     name_English:string='';
     NameEnValid:string='';
     NameEnError:boolean=false;
     IdValid:string='';
    IdError:boolean=false;
    selectedDate:any;

   constructor(
    private http: HttpClient,
    private clientservice: ClientService,private router:Router
    ,private bankService:BanksService,
    private cityService:CityService) { }

     ngOnInit(): void {
       this.getBanks();
       this.getCities();
     }
 
     getBanks(): void {
      this.bankService.getData().subscribe((res)=> res.Data.Banks.forEach(element => {
        this.banks.push(element);
       }));
    }
    getCities(): void {
      this.cityService.getList().subscribe((res:any)=>{
        this.cities=res
        console.log(res)
      }, (error: any) => {
        console.log(error)
      });
    }
    selected(){
      console.log(this.selectedLevel)
      this.bankService.getData().subscribe((res)=> res.Data.BankBranches
      .forEach(element => {
       if(element.BankCode==this.selectedLevel.Code)
        this.branches.push(element);
      })
      )
      console.log(this.branches);
        this.disableTextbox=false;
    }
    getidentity():void{
      this.IdError=false;
      console.log(this.identity)
      if(this.identity.length!=9){
        this.IdError=true;
        this.IdValid = "תעודת זהות צריכה להכיל 9 ספרות";
      }
      if( this.IdError==false)
      this.registerClient.identity_card=this.identity
    }

    validateAcount():void{
      this.accountError=false;
      console.log( this.account_number1);
      if(this.account_number1.length<10){
        this.accountError=true;
        this.accountValid = "מספר חשבון צריך להכיל 10 ספרות";
      }
      else{
      for (let i = 0; i < this.account_number1.length; i++)
      if (!/[0-9]/.test(this.account_number1[i])) {
        console.log("rr")
        this.accountError=true;
        this.accountValid = "הערך שהזנת לא חוקי";
      }
     }
     if( this.accountError==false)
     this.registerClient.account_number=this.account_number1
    }
    validateName():void{
      this.NameHError=false;
      console.log( this.name_Hebrew);
      if(this.name_Hebrew.length<19){
        this.NameHError=true;
        this.NameHValid = "הערך שהזנת לא חוקי";
      }
      else{
      for (let i = 0; i < this.name_Hebrew.length; i++)
      if (!/[\u0590-\u05FF]/.test(this.name_Hebrew[i])&&this.name_Hebrew[i]!='-'&&this.name_Hebrew[i]!=' '&&this.name_Hebrew[i]!=',') {
        this.NameHError=true;
        this.NameHValid = "הערך שהזנת לא חוקי";
      }
     }
     if( this.NameHError==false)
     this.registerClient.hebrew_name=this.name_Hebrew
    }
    validateNameEnglish():void{
      this.NameEnError=false;
      console.log( this.name_English);
      if(this.name_English.length<15){
        this.NameEnError=true;
        this.NameEnValid = "הערך שהזנת לא חוקי";
      }
      else{
      for (let i = 0; i < this.name_English.length; i++)
      if (!/[a-zA-Z\-]/.test(this.name_English[i])&&this.name_English[i]!='-'&&this.name_English[i]!=' '&&this.name_English[i]!=',') {
        this.NameEnError=true;
        this.NameEnValid = "הערך שהזנת לא חוקי";
      }
     }
     if( this.NameEnError==false)
     this.registerClient.english_name=this.name_English
      }
    save():void{
      this.registerClient.bank=this.selectedLevel.Description;
      this.registerClient.branch=this.selectedBranch.BranchName;
      this.registerClient.city_code=this.selectedCity.city_code;
      console.log(this.registerClient);
      this.clientservice.addClient(this.registerClient)
       .subscribe((res: any) => {
        Swal.fire('Thank you', 'You submitted succesfully!', 'success')
      this.router.navigate(['clients'])
       },
        (error: any) => {
          Swal.fire('Error', 'An error has occurred', 'error')
    
         }
       );
      
   
    }

}
