import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-product-category',
  templateUrl: './manage-product-category.component.html',
  styleUrls: ['./manage-product-category.component.css'],
})
export class ManageProductCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.loadProducts();
    this.loadCategories();
    this.loadproductCategories();
  }
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  productCategory: ProductCategory = new ProductCategory();
  reset: any = {
    id: '',
    product: {
      id: 0,
      name: '',
    },
    category: {
      id: 0,
      name: '',
    },
  };
  productCategories: any[] = [];
  products: any[] = [];
  productsNoCategory: any[] = [];
  categories: any[] = [];
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
      sortBy: 'ProductCategoryId',
      sortByPro: 'ProductCategoryId',
      sort: 'DESC',
    },
  };

  initReset() {
    this.productCategory = this.reset;
  }
  initUpdate(item: any) {
    this.productCategory = item;
  }
  loadproductCategories() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/productCategory/page' +
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
          this.productCategories = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadCategories() {
    this.restAPIService.get(this.URL_USER + '/category/product').subscribe(
      (res) => {
        this.categories = res;
        this.categories.splice(0, 0, {
          id: 0,
          name: '--- Chọn danh mục ---',
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
  loadProductsNoCategory() {
    for (let pro of this.productCategories) {
      for (let pro2 of this.products) {
        if (pro.product.id == pro2.id) {
          this.productsNoCategory.push(pro2);
        }
      }
    }
    //this.products.
    this.products = this.productsNoCategory;
    this.products.splice(0, 0, {
      id: 0,
      name: '--- Chọn danh mục ---',
    });
  }
  update() {
    this.restAPIService
      .edit(this.URL_ADMIN + '/productCategory', this.productCategory)
      .subscribe((res) => {
        this.loadproductCategories();
      });
    this.initReset();
  }
  add() {
    this.restAPIService
      .add(this.URL_ADMIN + '/productCategory/', this.productCategory)
      .subscribe((res) => {
        this.loadproductCategories();
      });
    this.initReset();
  }
  remove(item: any) {
    this.restAPIService
      .remove(this.URL_ADMIN + '/productCategory', item.id)
      .subscribe((res) => {
        this.loadproductCategories();
      });
  }

  loadPage() {
    this.restAPIService.get(this.URL_USER + '/productCategory/count').subscribe(
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
        if (this.filter.mySort.sortBy == 'ProductCategoryId') {
          this.filter.mySort.sortByPro = 'ProductCategoryId';
        }
      }
      this.loadproductCategories();
    });
  }

  switchData() {
    this.router.navigate(
      ['/admin/pages/manage-products/map-product-categories'],
      {
        queryParams: {
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      }
    );
    this.readParam();
  }

  initPage(page: number) {
    this.filter.page = page;
    this.switchData();
  }
}
