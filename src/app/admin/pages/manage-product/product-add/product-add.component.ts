import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileResponse } from 'src/app/models/file-response';
import { Products } from 'src/app/models/products';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  constructor(
    private restAPIService: RestAPIService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.initCboProvider();
    this.initCboBrand();
  }
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  providers: any[] = [{}];
  brands: any[] = [{}];
  product: Products = new Products();
  frmProduct: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    priceIn: new FormControl('', Validators.required),
    priceOut: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
    image: new FormControl(),
    images: new FormControl(),
    description: new FormControl('', Validators.required),
    provider: new FormGroup({
      id: new FormControl(),
    }),
    brand: new FormGroup({
      id: new FormControl(),
    }),
    coutView: new FormControl(),
    coutBuy: new FormControl(),
    showHome: new FormControl(),
    status: new FormControl(),
  });
  fileSelect: any;
  filesSelect: any[] = [];
  img: any = new FileResponse();
  imgs: any = [];

  initCboBrand() {
    this.restAPIService.get(this.URL_USER + '/brand').subscribe(
      (res) => {
        this.brands = res;
        this.brands.splice(0, 0, {
          id: 0,
          name: '--- Chọn danh mục ---',
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
          name: '--- Chọn danh mục ---',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
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
  add() {
    let httpUploadFile = new HttpHeaders({
      'X-CSRF-TOKEN': 'CSRF-Token',
    });
    // let httpUploadFile = new HttpHeaders({
    //   'Content-Type': 'application/json;multipart/form-data',
    // });

    if (this.frmProduct.invalid) {
      alert('submit chưa hợp lệ');
    } else {
      var fd = new FormData();
      fd.append(
        'file',
        this.fileSelect,
        'product-img-' + this.frmProduct.value.name + '.png'
      );
      var fds = new FormData();
      this.frmProduct.value.images = '';
      for (let i = 0; i < this.filesSelect.length; i++) {
        let nameNew =
          'product-imgs-' +
          this.frmProduct.value.name +
          '-v' +
          (i + 1) +
          '.png';
        fds.append('files', this.filesSelect[i], nameNew);
      }
      this.http
        .post(this.URL_USER + '/filemanager/upload', fd, {
          headers: httpUploadFile,
        })
        .subscribe(
          (res) => {
            this.img = res;
            this.frmProduct.value.image = this.img.fileUri;
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
              this.frmProduct.value.images = item.fileUri + ',';
            }
            this.product = this.frmProduct.value;
            this.product.createDate = new Date();
            this.product.updateDate = new Date();
            this.restAPIService
              .add(this.URL_ADMIN + '/product/', this.product)
              .subscribe((res) => {});
            alert('submit thành công');
          },
          (error) => console.log(error)
        );
    }
  }
}
