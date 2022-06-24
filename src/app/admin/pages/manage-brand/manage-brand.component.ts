import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-brand',
  templateUrl: './manage-brand.component.html',
  styleUrls: ['./manage-brand.component.css'],
})
export class ManageBrandComponent implements OnInit {
  constructor(
    private restAPIService: RestAPIService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  fileSelect: any;
  brand: Brand = new Brand();
  reset: any = {
    id: '',
    name: '',
    logo: '',
    description: '',
    Status: false,
  };
  brands: any[] = [
    {
      id: 0,
      name: '',
      logo: '',
      description: '',
      Status: false,
    },
  ];
  img: any = {};

  initReset() {
    this.brand = this.reset;
  }
  initUpdate(item: any) {
    this.brand = item;
  }
  loadBrands() {
    this.restAPIService.get(this.URL_USER + '/brand').subscribe(
      (res) => {
        this.brands = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    let httpUploadFile = new HttpHeaders({
      'X-CSRF-TOKEN': 'CSRF-Token',
    });
    var fd = new FormData();
    fd.append(
      'file',
      this.fileSelect,
      'brand-logo-' + this.brand.name + '.png'
    );
    this.http
      .post(this.URL_USER + '/filemanager/upload', fd, {
        headers: httpUploadFile,
      })
      .subscribe(
        (res) => {
          this.img = res;
          this.brand.logo = this.img.fileUri;
          this.restAPIService
            .edit(this.URL_ADMIN + '/brand', this.brand)
            .subscribe((res) => {
              this.loadBrands();
            });
          this.initReset();
        },
        (error) => console.log(error)
      );
  }
  add() {
    let httpUploadFile = new HttpHeaders({
      'X-CSRF-TOKEN': 'CSRF-Token',
    });
    var fd = new FormData();
    fd.append(
      'file',
      this.fileSelect,
      'brand-logo-' + this.brand.name + '.png'
    );
    this.http
      .post(this.URL_USER + '/filemanager/upload', fd, {
        headers: httpUploadFile,
      })
      .subscribe(
        (res) => {
          this.img = res;
          this.brand.logo = this.img.fileUri;
          this.restAPIService
            .add(this.URL_ADMIN + '/brand/', this.brand)
            .subscribe((res) => {
              this.loadBrands();
            });
          this.initReset();
        },
        (error) => console.log(error)
      );
  }
  remove(item: any) {
    this.restAPIService
      .remove(this.URL_ADMIN + '/brand', item.id)
      .subscribe((res) => {
        this.loadBrands();
      });
  }
  selectedFile(evt: any) {
    if (evt.target.files && evt.target.files.length > 0) {
      this.fileSelect = evt.target.files[0];
    }
    console.log(this.fileSelect);
  }
}
