import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { ProductDTO } from 'src/app/models/product-dto';
import { Products } from 'src/app/models/products';
import { LazyLoadScriptService } from 'src/app/servers/lazy-load-script.service';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-shop',
  templateUrl: './client-shop.component.html',
  styleUrls: ['./client-shop.component.css'],
})
export class ClientShopComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService,
    private lazyLoadService: LazyLoadScriptService
  ) {}

  ngOnInit(): void {
    this.readParam();
    this.loadBrand();
    this.loadColor();
    this.loadSize();
    this.loadStyle();
    this.loadPage();
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
  products: Array<Products> = [];
  brands: Array<Brand> = [];
  sizes: any = [
    {
      id: '',
      size: '',
    },
  ];
  colors: any = [
    {
      id: '',
      color: '',
    },
  ];
  styles: any = [
    {
      id: '',
      style: '',
    },
  ];
  mySortByFilters: any = [
    {
      name: 'Mặc định',
      flt: 'ProductId',
    },
    {
      name: 'Lượt xem',
      flt: 'countView',
    },
    {
      name: 'Lượt mua',
      flt: 'countBuy',
    },
    {
      name: 'Giá',
      flt: 'priceOut',
    },
    {
      name: 'Thời gian',
      flt: 'createDate',
    },
  ];
  mySortFilters: any = [
    {
      name: 'ASC',
    },
    {
      name: 'DESC',
    },
  ];
  mySortByFilter: String = '';
  categories: any = [
    {
      id: '',
      name: '',
    },
  ];
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
    sizePage: 9,
    mySort: {
      id: '1',
      name: 'Default Sorting',
      sortBy: 'ProductId',
      sortByPro: 'id',
      sort: 'ASC',
    },
  };
  countProducts = 0;
  totalPage = 0;
  filterActive: String = '';
  pageSize: any = [];
  mySorts: any[] = [
    {
      id: '1',
      name: 'Default Sorting',
      sortBy: 'ProductId',
      sortByPro: 'id',
      sort: 'ASC',
    },
    {
      id: '2',
      name: 'Mới nhất',
      sortBy: 'createDate',
      sortByPro: 'createDate',
      sort: 'DESC',
    },
    {
      id: '3',
      name: 'Giá từ thấp đến cao',
      sortBy: 'priceOut',
      sortByPro: 'priceOut',
      sort: 'ASC',
    },
    {
      id: '4',
      name: 'Giá từ cao đến thấp',
      sortBy: 'priceOut',
      sortByPro: 'priceOut',
      sort: 'DESC',
    },
  ];
  mySizePages: any = [
    {
      id: 1,
      sizePage: 9,
    },
    {
      id: 2,
      sizePage: 12,
    },
    {
      id: 3,
      sizePage: 15,
    },
  ];
  switchName: String = '';
  filterName: String = '';
  URL_USER: string = 'http://localhost:1111/api/user';

  removeFilter() {
    // this.switchName = '';
    // this.filterName = '';
    // this.switchData(this.switchName,this.filterName);
    this.router.navigate(['/shop'], {
      queryParams: {
        page: this.filter.page + 1,
        sizePage: this.filter.sizePage,
        sortBy: this.filter.mySort.sortBy,
        sort: this.filter.mySort.sort,
      },
    });
    this.readParam();
  }

  //đọc dữ liệu router và load lại dữ liệu
  readParam() {
    this.search = this.route.snapshot.params['search'];
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
        if (this.filter.mySort.sortBy == 'ProductId') {
          this.filter.mySort.sortByPro = 'id';
        }
      }
      if (params.get('brand') != null) {
        this.search = '';
        this.switchName = 'brand';
        this.filterName = params.get('brand') || '';
        this.loadProBrand(this.filterName);
      } else if (params.get('category') != null) {
        this.search = '';
        this.switchName = 'category';
        this.filterName = params.get('category') || '';
        this.loadProCategory(this.filterName);
      } else if (params.get('size') != null) {
        this.search = '';
        this.switchName = 'size';
        this.filterName = params.get('size') || '';
        this.loadProSize(this.filterName);
      } else if (params.get('color') != null) {
        this.search = '';
        this.switchName = 'color';
        this.filterName = params.get('color') || '';
        this.loadProColor(this.filterName);
      } else if (params.get('style') != null) {
        this.search = '';
        this.switchName = 'style';
        this.filterName = params.get('style') || '';
        this.loadProStyle(this.filterName);
      } else if (params.get('price') != null) {
        this.search = '';
        this.switchName = 'price';
        this.filter.priceMin = params.get('priceMin');
        this.filter.priceMax = params.get('priceMax');
        this.loadProPrice();
      } else {
        if (this.search != null) {
          this.loadSearch();
        } else {
          this.switchName = '';
          this.filterName = '';
          this.loadData();
        }
      }
      this.filterActive = this.filterName;
    });
  }

  //đổi dữ liệu router => readParam
  switchData(item: String, filter: String) {
    if (item == 'brand') {
      this.router.navigate(['/shop'], {
        queryParams: {
          brand: filter,
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      });
    } else if (item == 'size') {
      this.router.navigate(['/shop'], {
        queryParams: {
          size: filter,
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      });
    } else if (item == 'color') {
      this.router.navigate(['/shop'], {
        queryParams: {
          color: filter,
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      });
    } else if (item == 'category') {
      this.router.navigate(['/shop'], {
        queryParams: {
          category: filter,
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      });
    } else if (item == 'style') {
      this.router.navigate(['/shop'], {
        queryParams: {
          style: filter,
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      });
    } else if (item == 'price') {
      this.router.navigate(['/shop'], {
        queryParams: {
          price: filter,
          priceMin: this.filter.priceMin,
          priceMax: this.filter.priceMax,
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      });
    } else {
      this.router.navigate(['/shop'], {
        queryParams: {
          page: this.filter.page + 1,
          sizePage: this.filter.sizePage,
          sortBy: this.filter.mySort.sortBy,
          sort: this.filter.mySort.sort,
        },
      });
    }
    this.readParam();
  }
  //thay đổi Page
  initPage(page: number) {
    this.filter.page = page;
    this.switchData(this.switchName, this.filterName);
  }
  //Thay đổi cách thức sắp xếp ASC/DESC
  initSort() {
    this.switchData(this.switchName, this.filterName);
  }
  // Thay đổi phương thức sắp xếp(price/creaDate/Id...)
  initSortBy() {
    this.switchData(this.switchName, this.filterName);
  }
  //Thay đổi số lượng sản phẩm được load
  initSizePage() {
    this.switchData(this.switchName, this.filterName);
  }
  //Load số lượng sản phẩm và tính số lượng trang
  loadPage() {
    this.restAPIService.get(this.URL_USER + '/product/count').subscribe(
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
  //Load Product theo Page
  loadData() {
    console.log(
      this.URL_USER +
        '/product/page' +
        '/?page=' +
        this.filter.page +
        '&sizePage=' +
        this.filter.sizePage +
        '&sortBy=' +
        this.filter.mySort.sortByPro +
        '&sort=' +
        this.filter.mySort.sort
    );
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/page' +
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
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load  Brand
  loadBrand() {
    this.restAPIService.get(this.URL_USER + '/brand').subscribe(
      (res) => {
        this.brands = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Load  Size
  loadSize() {
    this.restAPIService.get(this.URL_USER + '/size').subscribe(
      (res) => {
        this.sizes = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Load  Color
  loadColor() {
    this.restAPIService.get(this.URL_USER + '/color').subscribe(
      (res) => {
        this.colors = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Load Style
  loadStyle() {
    this.restAPIService.get(this.URL_USER + '/style').subscribe(
      (res) => {
        this.styles = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Load Product lọc theo Price
  loadProPrice() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/price/?priceMin=' +
          this.filter.priceMin +
          '&priceMax=' +
          this.filter.priceMax +
          '&page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortBy +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load Product lọc theo Size
  loadProSize(size: String) {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/size/' +
          size +
          '/?page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortBy +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load Product lọc theo Color
  loadProColor(color: String) {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/color/' +
          color +
          '/?page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortBy +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load Product lọc theo Brand
  loadProBrand(brand: String) {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/brand/' +
          brand +
          '/?page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortBy +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load Product lọc theo Style
  loadProStyle(style: String) {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/style/' +
          style +
          '/?page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortBy +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load Product lọc theo Category
  loadProCategory(category: String) {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/category/' +
          category +
          '/?page=' +
          this.filter.page +
          '&sizePage=' +
          this.filter.sizePage +
          '&sortBy=' +
          this.filter.mySort.sortBy +
          '&sort=' +
          this.filter.mySort.sort
      )
      .subscribe(
        (res) => {
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load Product lọc theo thanh tìm kiếm( Tìm kiếm theo tên)
  loadSearch() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/getName/' +
          this.search +
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
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
