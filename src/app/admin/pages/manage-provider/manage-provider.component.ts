import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/provider';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-provider',
  templateUrl: './manage-provider.component.html',
  styleUrls: ['./manage-provider.component.css']
})
export class ManageProviderComponent implements OnInit {

  constructor(
    private restAPIService: RestAPIService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProviders();
  }
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  URL_USER: string = 'http://localhost:1111/api/user';
  fileSelect: any;
  provider: Provider = new Provider();
  reset: any = {
    id: '',
    name: '',
    logo: '',
    description: '',
    Status: false,
  };
  providers: any[] = [
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
    this.provider = this.reset;
  }
  initUpdate(item: any) {
    this.provider = item;
  }
  loadProviders() {
    this.restAPIService.get(this.URL_ADMIN + '/provider').subscribe(
      (res) => {
        this.providers = res;
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
      'provider-logo-' + this.provider.name + '.png'
    );
    this.http
      .post(this.URL_USER + '/filemanager/upload', fd, {
        headers: httpUploadFile,
      })
      .subscribe(
        (res) => {
          this.img = res;
          this.provider.logo = this.img.fileUri;
          this.restAPIService
            .edit(this.URL_ADMIN + '/provider', this.provider)
            .subscribe((res) => {
              console.log(res);
              this.loadProviders();
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
      'provider-logo-' + this.provider.name + '.png'
    );
    this.http
      .post(this.URL_USER + '/filemanager/upload', fd, {
        headers: httpUploadFile,
      })
      .subscribe(
        (res) => {
          this.img = res;
          this.provider.logo = this.img.fileUri;
          this.restAPIService
            .add(this.URL_ADMIN + '/provider/', this.provider)
            .subscribe((res) => {
              console.log(res);
              this.loadProviders();
            });
          this.initReset();
        },
        (error) => console.log(error)
      );
  }
  remove(item: any) {
    this.restAPIService
      .remove(this.URL_ADMIN + '/provider', item.id)
      .subscribe((res) => {
        this.loadProviders();
      });
  }
  selectedFile(evt: any) {
    if (evt.target.files && evt.target.files.length > 0) {
      this.fileSelect = evt.target.files[0];
    }
    console.log(this.fileSelect);
  }

}
