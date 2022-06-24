import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.css'],
})
export class ClientCartComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.readLocalStorage();
  }

  @Output() removeCart: EventEmitter<any> = new EventEmitter();
  @Output() updateCart: EventEmitter<any> = new EventEmitter();
  order: Order = new Order();

  readLocalStorage() {
    if (localStorage.getItem('order') != null) {
      this.order = JSON.parse(localStorage.getItem('order') || '[]');
    }
  }
  removeOrder(orderDetail: OrderDetail) {
    this.removeCart.emit(orderDetail);
    let temp = 0;
    for (let i = 0; i < this.order.orderDetails.length; i++) {
      if (this.order.orderDetails[i] == orderDetail) {
        temp = i;
      }
    }
    this.order.total -= orderDetail.price * orderDetail.quatity;
    this.order.orderDetails.splice(temp, 1);
  }
  preQuatity(orderDetail: OrderDetail, quatity: number) {
    if (quatity > 1) {
      quatity--;
      orderDetail.quatity = quatity;
      this.order.total -= orderDetail.price;
      localStorage.setItem('order', JSON.stringify(this.order));
      this.updateCart.emit(this.order.total);
    } else {
      orderDetail.quatity = 1;
    }
  }
  upQuatity(orderDetail: OrderDetail, quatity: number) {
    quatity++;
    orderDetail.quatity = quatity;
    this.order.total += orderDetail.price;
    localStorage.setItem('order', JSON.stringify(this.order));
    this.updateCart.emit(this.order.total);
  }
  updateTotal(total: number) {
    this.updateCart.emit(total);
  }
  switchCheckout() {
    this.router.navigate(['checkout']);
  }
  switchShop() {
    this.router.navigate(['shop']);
  }
}
