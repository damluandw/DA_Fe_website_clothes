import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadScriptService } from 'src/app/servers/lazy-load-script.service';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private restAPIService: RestAPIService,
    private router: Router,
    private lazyLoadService: LazyLoadScriptService
  ) {}
  ngOnInit(): void {
    this.lazyLoadService
      .loadScript('/assets/plugins/jquery/jquery.min.js')
      .subscribe((_) => {
        this.lazyLoadService
          .loadScript('/assets/plugins/bootstrap/js/bootstrap.bundle.min.js')
          .subscribe((_) => {
            this.lazyLoadService
              .loadScript('/assets/dist/js/adminlte.min.js')
              .subscribe((_) => {
                console.log('Jquery is loaded!');
              });
          });
      });
  }
  frmUser: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  user: any = {
    name: '',
    password: '',
    jwt: '',
  };
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  token = '';

  login() {
    this.user = this.frmUser.value;
    this.restAPIService.add(this.URL_ADMIN + '/login', this.user).subscribe(
      (res) => {
        let jwt = res.jwt;
        sessionStorage.setItem('admin', jwt);
        this.router.navigate(['admin/pages/manage-orders/order-new']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
