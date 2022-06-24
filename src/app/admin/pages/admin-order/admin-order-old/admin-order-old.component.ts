import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-admin-order-old',
  templateUrl: './admin-order-old.component.html',
  styleUrls: ['./admin-order-old.component.css'],
})
export class AdminOrderOldComponent implements OnInit {
  ngOnInit(): void {
    this.loadPage();
    this.loadData();
  }
  orders: Array<Order> = [];
  constructor(
    private route: ActivatedRoute,
    private restAPIService: RestAPIService,
    private router: Router
  ) {}
  orderForm: any = {};
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  countProducts = 0;
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
          '/order/page/1' +
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
  review(id: any) {
    this.router.navigate(['admin/pages/manage-orders/order', id]);
  }
  loadPage() {
    this.restAPIService.get(this.URL_USER + '/orderStatus/count/1').subscribe(
      (res) => {
        this.countProducts = res;
        if (this.countProducts % this.filter.sizePage == 0) {
          for (let i = 0; i <= this.countProducts / this.filter.sizePage; i++) {
            this.pageOrder.push({
              stt: i,
            });
          }
        } else {
          for (let i = 0; i <= this.countProducts / this.filter.sizePage; i++) {
            this.pageOrder.push({
              stt: i,
            });
          }
        }
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
        if (this.filter.mySort.sortBy == 'createDate') {
          this.filter.mySort.sortByPro = 'createDate';
        }
      }
      this.loadData();
    });
  }

  switchData() {
    this.router.navigate(['/admin/pages/manage-orders/order-old'], {
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
