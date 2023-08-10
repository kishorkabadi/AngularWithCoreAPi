import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import {AddEditCustomerComponent} from './customer/add-edit-customer/add-edit-customer.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'EditCustomer', component: AddEditCustomerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
