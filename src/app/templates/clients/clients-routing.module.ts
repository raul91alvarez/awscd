import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanicComponent } from 'src/app/core/shared_component/panic/panic.component';
import { ClientsComponent } from './clients.component';
import { DetailsClientsComponent } from './details-clients/details-clients.component';


const routes: Routes = [
  {path:'', component: ClientsComponent ,
},
  {path:'details/:data', component: DetailsClientsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
