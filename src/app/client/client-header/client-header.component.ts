import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Customer } from 'src/app/models/customer';
import { Favorite } from 'src/app/models/favorite';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { ProductCategory } from 'src/app/models/product-category';
import { LazyLoadScriptService } from 'src/app/servers/lazy-load-script.service';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css'],
})
export class ClientHeaderComponent implements OnInit {
  @Input() order: Order = new Order();
  @Input() customer: Customer = new Customer();
  @Input() favorite: Array<Favorite> = [];
  constructor(
    private route: ActivatedRoute,
    private restAPIService: RestAPIService,
    private lazyLoadService: LazyLoadScriptService
  ) {}
  ngOnInit(): void {
    this.loadData();
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
  search: String = '';
  filterActive: String = 'home'; //css choice
  dataCategory: any = {};
  URL_USER: String = 'http://localhost:1111/api/user';

  loadData() {
    this.restAPIService.get(this.URL_USER + '/category/product').subscribe(
      (res) => {
        this.dataCategory = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  removeOrder(orderDetail: OrderDetail) {
    let temp = 0;
    for (let i = 0; i < this.order.orderDetails.length; i++) {
      if (this.order.orderDetails[i] == orderDetail) {
        temp = i;
      }
    }
    this.order.total -= orderDetail.price * orderDetail.quatity;
    this.order.orderDetails.splice(temp, 1);
    localStorage.setItem('order', JSON.stringify(this.order));
  }
  logOut() {
    this.customer = new Customer();
    localStorage.removeItem('customer');
  }
}
