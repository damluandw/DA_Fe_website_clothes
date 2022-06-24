import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStyle } from 'src/app/models/product-style';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-product-style',
  templateUrl: './manage-product-style.component.html',
  styleUrls: ['./manage-product-style.component.css'],
})
export class ManageProductStyleComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.loadProducts();
    this.loadStyles();
    this.loadproductStyles();
  }

  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  productStyle: ProductStyle = new ProductStyle();
  reset: any = {
    id: '',
    product: {
      id: 0,
      name: '--- Chọn Sản phẩm ---',
    },
    style: {
      id: 0,
      name: '--- Chọn Style ---',
    },
  };
  productStyles: any[] = [];
  products: any[] = [];
  productsNoStyle: any[] = [];
  styles: any[] = [];
  countProducts = 0;
  pageStyle: any = [];
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
    sizePage: 10,
    mySort: {
      id: '1',
      name: 'Default Sorting',
      sortBy: 'ProductStyleId',
      sortByPro: 'ProductStyleId',
      sort: 'DESC',
    },
  };

  initReset() {
    this.productStyle = this.reset;
  }
  initUpdate(item: any) {
    this.productStyle = item;
  }
  loadproductStyles() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/productStyle/page' +
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
          this.productStyles = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadStyles() {
    this.restAPIService.get(this.URL_USER + '/style').subscribe(
      (res) => {
        this.styles = res;
        this.styles.splice(0, 0, {
          id: 0,
          style: '--- Chọn Style ---',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadProducts() {
    this.restAPIService.get(this.URL_USER + '/product').subscribe(
      (res) => {
        this.products = res;
        this.products.splice(0, 0, {
          id: 0,
          name: '--- Chọn sản phẩm ---',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadProductsNoStyle() {
    for (let pro of this.productStyles) {
      for (let pro2 of this.products) {
        if (pro.product.id == pro2.id) {
          this.productsNoStyle.push(pro2);
        }
      }
    }
    this.products = this.productsNoStyle;
    this.products.splice(0, 0, {
      id: 0,
      name: '--- Chọn sản phẩm ---',
    });
  }
  update() {
    this.restAPIService
      .edit(this.URL_ADMIN + '/productStyle', this.productStyle)
      .subscribe((res) => {
        this.loadproductStyles();
      });
    this.initReset();
  }
  add() {
    this.restAPIService
      .add(this.URL_ADMIN + '/productStyle/', this.productStyle)
      .subscribe((res) => {
        this.loadproductStyles();
      });
    this.initReset();
  }
  remove(item: any) {
    this.restAPIService
      .remove(this.URL_ADMIN + '/productStyle', item.id)
      .subscribe((res) => {
        this.loadproductStyles();
      });
  }

  loadPage() {
    this.restAPIService.get(this.URL_USER + '/productStyle/count').subscribe(
      (res) => {
        this.countProducts = res;
        if (this.countProducts % this.filter.sizePage == 0) {
          for (let i = 0; i < this.countProducts / this.filter.sizePage; i++) {
            this.pageStyle.push({
              stt: i,
            });
          }
        } else {
          for (let i = 0; i < this.countProducts / this.filter.sizePage; i++) {
            this.pageStyle.push({
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
        if (this.filter.mySort.sortBy == 'ProductStyleId') {
          this.filter.mySort.sortByPro = 'ProductStyleId';
        }
      }
      this.loadproductStyles();
    });
  }

  switchData() {
    this.router.navigate(['/admin/pages/manage-products/map-product-style'], {
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
