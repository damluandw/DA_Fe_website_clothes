import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductColor } from 'src/app/models/product-color';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-product-color',
  templateUrl: './manage-product-color.component.html',
  styleUrls: ['./manage-product-color.component.css'],
})
export class ManageProductColorComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.loadColors();
    this.loadProducts();
    this.loadColors();
    this.loadproductColors();
  }

  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  productColor: ProductColor = new ProductColor();
  reset: any = {
    id: '',
    product: {
      id: 0,
      name: '--- Chọn sản phẩm ---',
    },
    color: {
      id: 0,
      color: '--- Chọn màu sắc ---',
    },
  };
  productColors: any[] = [];
  products: any[] = [];
  productsNoColor: any[] = [];
  colors: any[] = [];
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
      sortBy: 'ProductColorId',
      sortByPro: 'ProductColorId',
      sort: 'DESC',
    },
  };

  initReset() {
    this.productColor = this.reset;
    console.log(this.productColor);
    console.log(this.reset);
  }
  initUpdate(item: any) {
    this.productColor = item;
  }
  loadproductColors() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/productColor/page' +
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
          this.productColors = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadColors() {
    this.restAPIService.get(this.URL_USER + '/color').subscribe(
      (res) => {
        this.colors = res;
        this.colors.splice(0, 0, {
          id: 0,
          color: '--- Chọn màu sắc ---',
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
  loadProductsNoColor() {
    for (let pro of this.productColors) {
      for (let pro2 of this.products) {
        if (pro.product.id == pro2.id) {
          this.productsNoColor.push(pro2);
        }
      }
    }
    //this.products.
    this.products = this.productsNoColor;
    this.products.splice(0, 0, {
      id: 0,
      name: '--- Chọn sản phẩm ---',
    });
  }
  update() {
    this.restAPIService
      .edit(this.URL_ADMIN + '/productColor', this.productColor)
      .subscribe((res) => {
        this.loadproductColors();
      });
    this.initReset();
  }
  add() {
    this.restAPIService
      .add(this.URL_ADMIN + '/productColor/', this.productColor)
      .subscribe((res) => {
        this.loadproductColors();
      });
    this.initReset();
  }
  remove(item: any) {
    this.restAPIService
      .remove(this.URL_ADMIN + '/productColor', item.id)
      .subscribe((res) => {
        this.loadproductColors();
      });
  }
  loadPage() {
    this.restAPIService.get(this.URL_USER + '/productColor/count').subscribe(
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
        if (this.filter.mySort.sortBy == 'ProductColorId') {
          this.filter.mySort.sortByPro = 'ProductColorId';
        }
      }
      this.loadproductColors();
    });
  }

  switchData() {
    this.router.navigate(['/admin/pages/manage-products/map-product-color'], {
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
