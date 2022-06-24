import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientAccountComponent } from './client-account.component';
import { ClientAccountInformationComponent } from './client-account-information/client-account-information.component';
import { ClientAccountRegisterComponent } from './client-account-register/client-account-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ClientAccountComponent,
    children: [
      { path: 'infor', component: ClientAccountInformationComponent },
      { path: 'register', component: ClientAccountRegisterComponent },
    ],
  },
];

@NgModule({
  declarations: [ClientAccountRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientAccountModule {}
