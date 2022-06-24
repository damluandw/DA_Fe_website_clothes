import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrderComponent } from './admin-order.component';
import { AdminOrderNewComponent } from './admin-order-new/admin-order-new.component';
import { AdminOrderDetailsComponent } from './admin-order-details/admin-order-details.component';
import { AdminOrderOldComponent } from './admin-order-old/admin-order-old.component';

const routes: Routes = [
  {  path: '', component: AdminOrderComponent,
    children: [
      { path: 'order-new', component: AdminOrderNewComponent},
      { path: 'order/:id', component: AdminOrderDetailsComponent},
      { path: 'order-old', component: AdminOrderOldComponent},
    ]
   }
];

@NgModule({
  declarations: [
    AdminOrderDetailsComponent,
    AdminOrderOldComponent
  ],
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminOrderModule { }
