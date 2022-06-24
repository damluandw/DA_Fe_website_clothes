import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-history-cart-detail',
  templateUrl: './client-history-cart-detail.component.html',
  styleUrls: ['./client-history-cart-detail.component.css'],
})
export class ClientHistoryCartDetailComponent implements OnInit {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.loadData();
  }
  order: Order = new Order();
  orderDetails: Array<OrderDetail> = [];
  orderId: number = 0;
  URL_USER: string = 'http://localhost:1111/api/user';

  btnBack() {
    this.location.back();
  }
  loadData() {
    this.restAPIService
      .findId(this.URL_USER + '/order', this.orderId)
      .subscribe(
        (res) => {
          console.log(res);
          this.order = res;
        },
        (err) => {
          console.log(err);
        }
      );
    this.restAPIService
      .get(this.URL_USER + '/orderDetail/byOrderId/' + this.orderId)
      .subscribe(
        (res) => {
          console.log(res);
          this.orderDetails = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  switchCheckout() {
    this.router.navigate(['checkout']);
  }
  switchShop() {
    this.router.navigate(['shop']);
  }
  switchShopDetail(id: number, name: String) {
    this.router.navigate(['shop/deatails', id, name]);
  }
}
