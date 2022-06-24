import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSize } from 'src/app/models/product-size';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-product-size',
  templateUrl: './manage-product-size.component.html',
  styleUrls: ['./manage-product-size.component.css'],
})
export class ManageProductSizeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.loadProducts();
    this.loadSizes();
    this.loadproductSizes();
  }

  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  productSize: ProductSize = new ProductSize();
  reset: any = {
    id: '',
    product: {
      id: 0,
      name: '--- Chọn Sản phẩm ---',
    },
    size: {
      id: 0,
      name: '--- Chọn Size ---',
    },
  };
  productSizes: any[] = [];
  products: any[] = [];
  productsNoSize: any[] = [];
  sizes: any[] = [];
  countProducts = 0;
  pageSize: any = [];
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
      sortBy: 'ProductSizeId',
      sortByPro: 'ProductSizeId',
      sort: 'DESC',
    },
  };

  initReset() {
    this.productSize = this.reset;
  }
  initUpdate(item: any) {
    this.productSize = item;
  }
  loadproductSizes() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/productSize/page' +
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
          this.productSizes = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadSizes() {
    this.restAPIService.get(this.URL_USER + '/size').subscribe(
      (res) => {
        this.sizes = res;
        this.sizes.splice(0, 0, {
          id: 0,
          size: '--- Chọn Size ---',
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
  loadProductsNoSize() {
    for (let pro of this.productSizes) {
      for (let pro2 of this.products) {
        if (pro.product.id == pro2.id) {
          this.productsNoSize.push(pro2);
        }
      }
    }
    this.products = this.productsNoSize;
    this.products.splice(0, 0, {
      id: 0,
      name: '--- Chọn sản phẩm ---',
    });
  }
  update() {
    this.restAPIService
      .edit(this.URL_ADMIN + '/productSize', this.productSize)
      .subscribe((res) => {
        this.loadproductSizes();
      });
    this.initReset();
  }
  add() {
    this.restAPIService
      .add(this.URL_ADMIN + '/productSize/', this.productSize)
      .subscribe((res) => {
        this.loadproductSizes();
      });
    this.initReset();
  }
  remove(item: any) {
    this.restAPIService
      .remove(this.URL_ADMIN + '/productSize', item.id)
      .subscribe((res) => {
        this.loadproductSizes();
      });
  }

  loadPage() {
    this.restAPIService.get(this.URL_USER + '/productSize/count').subscribe(
      (res) => {
        this.countProducts = res;
        if (this.countProducts % this.filter.sizePage == 0) {
          for (let i = 0; i < this.countProducts / this.filter.sizePage; i++) {
            this.pageSize.push({
              stt: i,
            });
          }
        } else {
          for (let i = 0; i < this.countProducts / this.filter.sizePage; i++) {
            this.pageSize.push({
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
        if (this.filter.mySort.sortBy == 'ProductSizeId') {
          this.filter.mySort.sortByPro = 'ProductSizeId';
        }
      }
      this.loadproductSizes();
    });
  }

  switchData() {
    this.router.navigate(['/admin/pages/manage-products/map-product-size'], {
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
