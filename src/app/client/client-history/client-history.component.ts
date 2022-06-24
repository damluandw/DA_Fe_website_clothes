import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.css'],
})
export class ClientHistoryComponent implements OnInit {
  constructor(private router: Router, private restAPIService: RestAPIService) {}
  ngOnInit(): void {
    this.loginAccount();
    this.readLocalStorage();
  }

  URL_USER: String = 'http://localhost:1111/api/user';
  customer: any = '';
  orders: any = [];

  loginAccount() {
    if (localStorage.getItem('order') != null) {
      this.customer = JSON.parse(localStorage.getItem('customer') || '[]');
      if (this.customer == '') {
        this.customer.id = 0;
      }
    }
  }
  readLocalStorage() {
    if (this.customer.id != 0) {
      this.restAPIService
        .get(this.URL_USER + '/order/byCustomerId/' + this.customer.id)
        .subscribe((res) => {
          this.orders = res;
        });
    } else if (localStorage.getItem('orderHistory') != null) {
      let order = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      this.orders.push(order);
      console.log(this.orders);
    }
  }
  switchCheckout() {
    this.router.navigate(['checkout']);
  }
  switchShop() {
    this.router.navigate(['shop']);
  }
  review(id: any) {
    this.router.navigate(['history', id]);
  }
}
