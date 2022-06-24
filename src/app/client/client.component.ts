import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { Favorite } from '../models/favorite';
import { Order } from '../models/order';
import { OrderDetail } from '../models/order-detail';
import { Products } from '../models/products';
import { LazyLoadScriptService } from '../servers/lazy-load-script.service';
import { RestAPIService } from '../servers/rest-api.service';
import { ClientCartComponent } from './client-cart/client-cart.component';
import { ClientCheckoutComponent } from './client-checkout/client-checkout.component';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientShopDetailComponent } from './client-shop-detail/client-shop-detail.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  constructor(
    private restAPIService: RestAPIService,
    private lazyLoadService: LazyLoadScriptService
  ) {}
  customer: Customer = new Customer();
  order: Order = new Order();
  orderDetails: Array<OrderDetail> = [];
  products: Array<Products> = [];
  product: Products = new Products();
  productId: number = 0;
  favorite:  Array<Favorite> = [];
  ngOnInit(): void {
    // localStorage.removeItem;
    this.readLocalStorage();
    this.loginAccount();
    this.lazyLoadService
      .loadScript('/assets/js/jquery-3.3.1.min.js')
      .subscribe((_) => {
        this.lazyLoadService
          .loadScript('/assets/js/bootstrap.min.js')
          .subscribe((_) => {
            this.lazyLoadService
              .loadScript('/assets/js/jquery-ui.min.js')
              .subscribe((_) => {
                this.lazyLoadService
                  .loadScript('/assets/js/jquery.countdown.min.js')
                  .subscribe((_) => {
                    this.lazyLoadService
                      .loadScript('/assets/js/jquery.nice-select.min.js')
                      .subscribe((_) => {
                        this.lazyLoadService
                          .loadScript('/assets/js/jquery.zoom.min.js')
                          .subscribe((_) => {
                            this.lazyLoadService
                              .loadScript('/assets/js/jquery.dd.min.js')
                              .subscribe((_) => {
                                this.lazyLoadService
                                  .loadScript('/assets/js/jquery.slicknav.js')
                                  .subscribe((_) => {
                                    this.lazyLoadService
                                      .loadScript(
                                        '/assets/js/owl.carousel.min.js'
                                      )
                                      .subscribe((_) => {
                                        this.lazyLoadService
                                          .loadScript('/assets/js/main.js')
                                          .subscribe((_) => {
                                            console.log('Jquery is loaded!');
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  }

  communicate(evt: any) {
    if (evt instanceof ClientShopDetailComponent) {
      evt.addCart.subscribe((res) => {
        this.readLocalStorage();
        if (this.order.orderDetails.length != 0) {
          let check = false;
          for (const item of this.order.orderDetails) {
            if (
              item.product.id == res.product.id &&
              item.quatity == res.quatity &&
              item.color.id == res.color.id &&
              item.size.id == res.size.id
            ) {
              check = true;
              alert('Sản phẩm đã trong giỏ hàng');
            }
          }
          if (check != true) {
            this.order.orderDetails.push(res);
            this.order.total += res.price * res.quatity;
            alert('Sản phẩm đã đươc thêm vào giỏ hàng');
            localStorage.setItem('order', JSON.stringify(this.order));
          }
        } else {
          this.order.orderDetails.push(res);
          this.order.total += res.price * res.quatity;
          alert('Sản phẩm đã đươc thêm vào giỏ hàng');
          localStorage.setItem('order', JSON.stringify(this.order));
        }
      });
    }
    if (evt instanceof ClientCartComponent) {
      evt.removeCart.subscribe((res) => {
        console.log('remove');
        let temp = 0;
        for (let i = 0; i < this.order.orderDetails.length; i++) {
          if (this.order.orderDetails[i] == res) {
            temp = i;
          }
        }
        this.order.total -= res.price * res.quatity;
        this.order.orderDetails.splice(temp, 1);
        localStorage.setItem('order', JSON.stringify(this.order));
      });
      evt.updateCart.subscribe((res) => {
        this.readLocalStorage();
        this.order.total = res;
        localStorage.setItem('order', JSON.stringify(this.order));
      });
    }
    if (evt instanceof ClientCheckoutComponent) {
      evt.reloadData.subscribe((res) => {
        this.order = res;
        this.order.total = 0;
        localStorage.setItem('order', JSON.stringify(this.order));
      });
    }
    if (evt instanceof ClientLoginComponent) {
      evt.login.subscribe((res) => {
        this.customer = res;
        localStorage.setItem('customer', JSON.stringify(this.customer));
      });
    }
  }
  loginAccount() {
    if (localStorage.getItem('customer') != null) {
      this.customer = JSON.parse(localStorage.getItem('customer') || '[]');
    }
  }

  readLocalStorage() {
    if (localStorage.getItem('order') != null) {
      this.order = JSON.parse(localStorage.getItem('order') || '[]');
    }
    if (localStorage.getItem('favorite') != null) {
      this.favorite = JSON.parse(localStorage.getItem('favorite') || '[]');
    }
  }
  refresh(): void {
    window.location.reload();
  }
}
