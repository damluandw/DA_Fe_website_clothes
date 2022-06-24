import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAPIService: RestAPIService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadPage();
    this.initCboProvider();
    this.initCboBrand();
    this.initCboCategories();
    this.loadData();
  }

  providers: any[] = [{}];
  brands: any[] = [{}];
  isNew: boolean = true;
  reset: any = {
    id: '',
    name: '',
    priceIn: '',
    priceOut: '',
    discount: '',
    image: '',
    images: '',
    description: '',
    createDate: '',
    updateDate: '',
    provider: {
      id: 0,
      name: '--- Chọn danh mục ---',
    },
    brand: {
      id: 0,
      name: '--- Chọn danh mục ---',
    },
    coutView: '',
    coutBuy: '',
    showHome: false,
    status: false,
    categories: {
      id: '',
      category: {
        id: 0,
        name: '',
      },
    },
    sizes: {},
    colors: {},
    styles: {},
  };
  product: Products = new Products();
  category: Category = new Category();
  categories: Array<Category> = [];
  products: Array<Products> = [];
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  fileSelect: any = '';
  img: any = '';
  filesSelect: any[] = [];
  imgs: any = [];
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
      sortBy: 'createDate',
      sortByPro: 'id',
      sort: 'DESC',
    },
  };
  selectedFile(evt: any) {
    if (evt.target.files && evt.target.files.length > 0) {
      this.fileSelect = evt.target.files[0];
    }
    console.log(this.fileSelect);
  }
  selectedFiles(evt: any) {
    if (evt.target.files && evt.target.files.length > 0) {
      this.filesSelect = evt.target.files;
    }
    console.log(this.filesSelect);
  }
  loadData() {
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
  initCboCategories() {
    this.restAPIService.get(this.URL_USER + '/category/product').subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  initCboBrand() {
    this.restAPIService.get(this.URL_USER + '/brand').subscribe(
      (res) => {
        this.brands = res;
        this.brands.splice(0, 0, {
          id: 0,
          name: '--- Chọn nhãn hàng ---',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  initCboProvider() {
    this.restAPIService.get(this.URL_ADMIN + '/provider').subscribe(
      (res) => {
        this.providers = res;
        this.providers.splice(0, 0, {
          id: 0,
          name: '--- Chọn nhà cung cấp ---',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  initUpdate(item: any) {
    this.product = item;
  }
  initReset() {
    this.product = this.reset;
  }
  update() {
    let httpUploadFile = new HttpHeaders({
      'X-CSRF-TOKEN': 'CSRF-Token',
    });
    // let httpUploadFile = new HttpHeaders({
    //   'Content-Type': 'application/json;multipart/form-data',
    // });

    var fd = new FormData();
    fd.append(
      'file',
      this.fileSelect,
      'product-img-' + this.product.name + '.png'
    );
    var fds = new FormData();
    this.product.images = '';
    for (let i = 0; i < this.filesSelect.length; i++) {
      let nameNew =
        'product-imgs-' + this.product.name + '-v' + (i + 1) + '.png';
      fds.append('files', this.filesSelect[i], nameNew);
    }
    this.http
      .post(this.URL_USER + '/filemanager/upload', fd, {
        headers: httpUploadFile,
      })
      .subscribe(
        (res) => {
          this.img = res;
          this.product.image = this.img.fileUri;
        },
        (error) => console.log(error)
      );
    this.http
      .post(this.URL_USER + '/filemanager/uploads', fds, {
        headers: httpUploadFile,
      })
      .subscribe(
        (data) => {
          this.imgs = data;
          for (const item of this.imgs) {
            this.product.images = item.fileUri + ',';
          }
          this.product.updateDate = new Date();
          this.restAPIService
            .edit(this.URL_ADMIN + '/product', this.product)
            .subscribe((res) => {
              this.loadData();
            });
          this.initReset();
          alert('submit thành công');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  remove(item: any) {
    this.restAPIService
      .remove(this.URL_ADMIN + '/product', item.id)
      .subscribe((res) => {
        this.loadData();
      });
  }
  initPage(page: number) {
    this.filter.page = page;
    this.switchData();
  }

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
        if (this.filter.mySort.sortBy == 'ProductId') {
          this.filter.mySort.sortByPro = 'id';
        }
      }
      this.loadData();
    });
  }

  switchData() {
    this.router.navigate(['/admin/pages/manage-products/edit'], {
      queryParams: {
        page: this.filter.page + 1,
        sizePage: this.filter.sizePage,
        sortBy: this.filter.mySort.sortBy,
        sort: this.filter.mySort.sort,
      },
    });
    this.readParam();
  }
}
