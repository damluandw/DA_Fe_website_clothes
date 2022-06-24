import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css'],
})
export class AdminCustomerComponent implements OnInit {
  constructor(private restAPIService: RestAPIService) {}

  ngOnInit(): void {
    this.loadData();
  }
  customers: Array<Customer> = [];
  URL_USER: string = 'http://localhost:1111/api/user';

  loadData() {
    this.restAPIService.get(this.URL_USER + '/customer').subscribe(
      (res) => {
        this.customers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
