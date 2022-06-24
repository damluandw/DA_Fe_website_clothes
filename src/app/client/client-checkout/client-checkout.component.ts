import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { RestAPIService } from 'src/app/servers/rest-api.service';
import { OrderDetail } from 'src/app/models/order-detail';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css'],
})
export class ClientCheckoutComponent implements OnInit {
  constructor(private router: Router, private restAPIService: RestAPIService) {}

  ngOnInit(): void {
    this.loginAccount();
    console.log(this.customer.id)
    this.readLocalStorage();
  }

  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  order: Order = new Order();
  orderHistory: Order = new Order();
  orderDetails: Array<OrderDetail> = [];
  URL_USER: string = 'http://localhost:1111/api/user';
  frmOrder: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    postcode: new FormControl(),
    status: new FormControl(0),
    createDate: new FormControl(new Date()),
  });
  checkInforAccount: boolean = false;
  checkAccount: boolean = false;
  customer: Customer = new Customer();

  readLocalStorage() {
    if (localStorage.getItem('order') != null) {
      this.order = JSON.parse(localStorage.getItem('order') || '[]');
    } else {
      this.order = new Order();
    }
    if (localStorage.getItem('orderHistory') != null) {
      this.orderHistory = JSON.parse(
        localStorage.getItem('orderHistory') || '[]'
      );
    }
  }
  switchLogin() {
    this.router.navigate(['login']);
  }
  switchShop() {
    this.router.navigate(['shop']);
  }
  btnCheckAccount() {
    this.checkAccount = !this.checkAccount;
  }
  btnCheckInforAccount() {
    this.checkInforAccount = !this.checkInforAccount;
  }
  loginAccount() {
    if (localStorage.getItem('customer') != null) {
      this.customer = JSON.parse(localStorage.getItem('customer') || '[]');
      console.log(this.customer)
    }
  }
  btnPlaceOrder(frmOrder: any) {
    if (this.customer.id != 0 && this.checkInforAccount == true) {
      this.order.customer = this.customer;
      this.order.firstName = this.customer.firstName;
      this.order.lastName = this.customer.lastName;
      this.order.email = this.customer.email;
      this.order.phone = this.customer.phone;
      this.order.country = this.customer.country;
      this.order.city = this.customer.city;
      this.order.email = this.customer.email;
      this.order.streetAddress = this.customer.streetAddress;
      this.order.postcode = this.customer.postcode;
      this.order.createDate = new Date();
      this.postOrder();
    } else if (this.frmOrder.invalid) {
      alert('Bạn chưa điền đầy đủ thông tin');
    } else {
      if (this.customer.id != 0) {
        this.order.customer = this.customer;
      } else {
        this.customer.id = 1;
        this.order.customer = this.customer;
      }
      this.order.firstName = this.frmOrder.value.firstName;
      this.order.lastName = this.frmOrder.value.lastName;
      this.order.email = this.frmOrder.value.email;
      this.order.phone = this.frmOrder.value.phone;
      this.order.country = this.frmOrder.value.country;
      this.order.city = this.frmOrder.value.city;
      this.order.email = this.frmOrder.value.email;
      this.order.streetAddress = this.frmOrder.value.streetAddress;
      this.order.postcode = this.frmOrder.value.postcode;
      this.order.createDate = new Date();
      this.postOrder();
    }
  }
  postOrder() {
    if (this.order.orderDetails.length != 0) {
      this.restAPIService
        .add(this.URL_USER + '/order', this.order)
        .subscribe((res) => {
          this.order = res;
          this.orderHistory = this.order;
          this.customer.id = 0;
          localStorage.setItem(
            'orderHistory',
            JSON.stringify(this.orderHistory)
          );
          this.readLocalStorage();
          for (const item of this.order.orderDetails) {
            item.order = res;
            this.restAPIService
              .add(this.URL_USER + '/orderDetail/', item)
              .subscribe((res) => {
                console.log('Thêm thành công');
              });
          }
          localStorage.removeItem('order');
          this.readLocalStorage();
          this.reloadData.emit(this.order);
          alert('Đơn hàng của bạn sẽ được xác nhận lại qua mail!');
          if (this.checkAccount == true) {
            this.router.navigate(['register']);
          } else {
            this.router.navigate(['history']);
          }
        });
    } else {
      alert('Bạn chưa chọn sản phẩm');
    }
  }
}
