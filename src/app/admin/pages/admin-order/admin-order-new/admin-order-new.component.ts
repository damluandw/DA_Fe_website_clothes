import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-admin-order-new',
  templateUrl: './admin-order-new.component.html',
  styleUrls: ['./admin-order-new.component.css'],
})
export class AdminOrderNewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private restAPIService: RestAPIService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadPage();
    this.loadData();
  }
  order: Order = new Order();
  orderDetail: OrderDetail = new OrderDetail();
  orders: Array<Order> = [];
  ordersDetail: Array<OrderDetail> = [];
  orderForm: any = {};
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  countOrder = 0;
  pageOrder: any = [];
  filter: any = {
    id: 0,
    priceMin: 0,
    priceMax: 100,
    categoryName: 'default',
    color: 'default',
    size: 'default',
    brand: 'default',
    style: 'default',
    page: 0,
    sizePage: 5,
    mySort: {
      id: '1',
      name: 'Default Sorting',
      sortBy: 'createDate',
      sortByPro: 'createDate',
      sort: 'DESC',
    },
  };

  loadData() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/order/page/0' +
          '/?page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortByPro +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.orders = res;
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
  review(id: any) {
    this.router.navigate(['admin/pages/manage-orders/order', id]);
  }

  loadPage() {
    this.restAPIService.get(this.URL_USER + '/orderStatus/count/0').subscribe(
      (res) => {
        this.countOrder = res;
        if (this.countOrder < this.filter.sizePage) {
          this.pageOrder.push({
            stt: 0,
          });
        } else if (this.countOrder % this.filter.sizePage == 0) {
          for (let i = 0; i <= this.countOrder / this.filter.sizePage; i++) {
            this.pageOrder.push({
              stt: i,
            });
          }
        } else {
          for (let i = 0; i <= this.countOrder / this.filter.sizePage; i++) {
            this.pageOrder.push({
              stt: i,
            });
          }
        }
        console.log(this.pageOrder);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  readParam() {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('page') != null) {
        this.filter.page = params.get('page');
        this.filter.page--;
      }
      if (params.get('sizePage') != null) {
        this.filter.sizePage = params.get('sizePage');
      }
      if (params.get('sort') != null) {
        this.filter.mySort.sort = params.get('sort');
      }
      if (params.get('sortBy') != null) {
        this.filter.mySort.sortBy = params.get('sortBy');
        if (this.filter.mySort.sortBy == 'CreateDate') {
          this.filter.mySort.sortByPro = 'CreateDate';
        }
      }
      this.loadData();
    });
  }

  switchData() {
    this.router.navigate(['/admin/pages/manage-orders/order-new'], {
      queryParams: {
        page: this.filter.page + 1,
        sizePage: this.filter.sizePage,
        sortBy: this.filter.mySort.sortBy,
        sort: this.filter.mySort.sort,
      },
    });
    this.readParam();
  }

  initPage(page: number) {
    this.filter.page = page;
    this.switchData();
  }
}
