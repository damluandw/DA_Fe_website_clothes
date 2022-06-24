import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css'],
})
export class AdminOrderDetailsComponent implements OnInit {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService
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
          this.orderDetails = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  initUpdate(order: any) {
    order.updateDate = new Date();
    order.status = true;
    this.restAPIService.edit(this.URL_USER + '/order', order).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      }
    );
    this.restAPIService
      .get(this.URL_USER + '/orderDetail/byOrderId/' + order.id)
      .subscribe(
        (res) => {
          for (const item of res) {
            item.status = true;
            this.restAPIService
              .edit(this.URL_USER + '/orderDetail', item)
              .subscribe(
                (res) => {},
                (err) => {
                  console.log(err);
                }
              );
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
