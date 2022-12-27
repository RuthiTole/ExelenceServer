import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogupComponent } from './logup/logup.component';
import { ClientsListComponent } from './clients-list/clients-list.component';


const routes: Routes = [ {path:"clients",component:ClientsListComponent},
{path:"",component:LogupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
