import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-account-information',
  templateUrl: './client-account-information.component.html',
  styleUrls: ['./client-account-information.component.css'],
})
export class ClientAccountInformationComponent implements OnInit {
  constructor(private restAPIService: RestAPIService) {}

  ngOnInit(): void {
    this.loginAccount();
  }

  customer: Customer = new Customer();
  CustomerId: number = 0;
  URL_USER: string = 'http://localhost:1111/api/user';

  loginAccount() {
    if (localStorage.getItem('customer') != null) {
      this.customer = JSON.parse(localStorage.getItem('customer') || '[]');
    }
  }
}
