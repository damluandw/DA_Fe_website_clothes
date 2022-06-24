import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadScriptService } from 'src/app/servers/lazy-load-script.service';
import { RestAPIService } from 'src/app/servers/rest-api.service';
import { EventEmitter } from '@angular/core';
import { OrderDetail } from 'src/app/models/order-detail';
import { Products } from 'src/app/models/products';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { ProductSize } from 'src/app/models/product-size';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductColor } from 'src/app/models/product-color';
import { Favorite } from 'src/app/models/favorite';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-client-shop-detail',
  templateUrl: './client-shop-detail.component.html',
  styleUrls: ['./client-shop-detail.component.css'],
})
export class ClientShopDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restAPIService: RestAPIService,
    private lazyLoadService: LazyLoadScriptService
  ) {}
  ngOnInit(): void {
    this.proId = this.route.snapshot.params['id'];
    this.loadData();
    this.loadBrand();
    this.loadColor();
    this.loadSize();
    this.loadStyle();
    this.lazyload();
  }
  @Output() addCart: EventEmitter<any> = new EventEmitter();
  orderDetail: OrderDetail = new OrderDetail();
  proId: number = 0;
  productD: Products = new Products();
  ratePro: number = 0;
  productDetail: Products = new Products();
  sizesDetail: Array<ProductSize> = [];
  feedback: any = {
    product: {
      id: this.proId,
    },
    customer: {
      id: 0,
    },
    fullName: '',
    email: '',
    avatar: '',
    content: '',
    rate: 5,
    createDate: new Date(),
    status: true,
  };
  feebacks: any[] = [
    {
      id: '',
      fullName: '',
      content: '',
      rate: 5,
      createDate: '',
      avatar: '',
    },
  ];
  colorsDetail: Array<ProductColor> = [];
  colorActive: any = '';
  sizeActive: any = '';
  imgShow: String = '';
  stylesDetail: any = [
    {
      style: {
        id: '',
        style: '',
      },
    },
  ];
  categoriesDetail: Array<ProductCategory> = [];
  imgs: any[] = [];
  productsRelate: Array<Products> = [];
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
  filterActive: String = '';
  switchName: String = '';
  filterName: String = '';
  showNavActive=1;
  URL_USER: string = 'http://localhost:1111/api/user';

  //Thêm sản phẩm vào giỏ hàng
  addtoCart() {
    let check = true;
    if (this.orderDetail.color.id == 0) {
      alert('Vui lòng chọn màu sắc sản phẩm');
      check = false;
    }
    if (this.orderDetail.size.id == 0) {
      alert('Vui lòng chọn size sản phẩm');
      check = false;
    }
    if (check) {
      this.orderDetail.product = this.productDetail;
      this.orderDetail.createDate = new Date();
      this.orderDetail.price = this.productDetail.priceOut;
      this.addCart.emit(this.orderDetail);
    }
  }
  //Chọn màu
  choiceColor(res: any) {
    this.orderDetail.color = res;
  }
  //Chọn Size
  choiceSize(res: Size) {
    this.orderDetail.size = res;
  }
  //Load dữ liệu Detail
  loadData() {
    this.restAPIService
      .get(this.URL_USER + '/productColor/byProductId/' + this.proId)
      .subscribe(
        (res) => {
          this.colorsDetail = res;
        },
        (err) => {
          console.log(err);
        }
      );
    this.restAPIService.get(this.URL_USER + '/product/' + this.proId).subscribe(
      (res) => {
        this.productDetail = res;
        this.imgs = this.productDetail.images.split(',');
        this.imgShow = this.productDetail.image;
      },
      (err) => {
        console.log(err);
      }
    );
    this.restAPIService
      .get(this.URL_USER + '/productSize/byProductId/' + this.proId)
      .subscribe(
        (res) => {
          this.sizesDetail = res;
        },
        (err) => {
          console.log(err);
        }
      );

    this.restAPIService
      .get(this.URL_USER + '/productCategory/byProductId/' + this.proId)
      .subscribe(
        (res) => {
          this.categoriesDetail = res;
        },
        (err) => {
          console.log(err);
        }
      );
    this.restAPIService
      .get(this.URL_USER + '/productStyle/byProductId/' + this.proId)
      .subscribe(
        (res) => {
          this.stylesDetail = res;
        },
        (err) => {
          console.log(err);
        }
      );
    this.restAPIService
      .get(this.URL_USER + '/feeback/byProductId/' + this.proId)
      .subscribe(
        (res) => {
          this.feebacks = res;
          for (let i = 0; i < this.feebacks.length; i++) {
            this.ratePro += this.feebacks[i].rate;
          }
          this.ratePro = this.ratePro / this.feebacks.length;
          console.log(this.ratePro)

          this.loadProRelated();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Load sản phẩm liên quan theo brand
  loadProRelated() {
    this.restAPIService
      .get(
        this.URL_USER +
          '/product/brand/' +
          this.productDetail.brand.name +
          '/?sizePage=4'
      )
      .subscribe(
        (res) => {
          this.productsRelate = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  // Đánh giá
  initRate(number: number) {
    this.feedback.rate = number;
  }
  //Gửi feeback
  postFeeback() {
    this.feedback.product.id = this.proId;
    this.restAPIService
      .get(this.URL_USER + '/customer/getEmail/' + this.feedback.email)
      .subscribe(
        (res) => {
          this.feedback.customer.id = res.id;
          this.feedback.avatar = res.avatar;
          this.restAPIService
            .add(this.URL_USER + '/feeback', this.feedback)
            .subscribe(
              (res) => {
                console.log('Thành công');
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (err) => {
          alert('Không tìm thấy email tài khoản');
          console.log(err);
        }
      );
  }
  //Chọn ảnh phóng to
  initImgShow(img: any) {
    this.imgShow = img;
  }
  //Load Brand
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
  //Load Size
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
  //Load Color
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
  //Đổi đường link
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
  }
  // Đổi sản phẩm
  switchShopDetail(id: number, name: String) {
    this.router.navigate(['shop/details', id, name]);
    this.proId = id;
    this.loadData();
    this.lazyload();
  }
  //Giảm số lượng sản phẩm
  preQuatity(quatity: number) {
    if (quatity > 1) {
      quatity--;
      this.orderDetail.quatity = quatity;
    } else {
      this.orderDetail.quatity = 1;
    }
  }
  //Tăng số lượng sản phẩm
  upQuatity(quatity: number) {
    quatity++;
    this.orderDetail.quatity = quatity;
  }

  lazyload() {
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
}
