import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css'],
})
export class ClientLoginComponent implements OnInit {
  constructor(private router: Router, private restAPIService: RestAPIService) {}

  ngOnInit(): void {}

  @Output() login: EventEmitter<any> = new EventEmitter();
  URL_USER: string = 'http://localhost:1111/api/user';
  URL_ADMIN: string = 'http://localhost:1111/api/admin';
  frmLogin: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  checkSaveAccount: boolean = false;

  btnCheckAccount() {
    this.checkSaveAccount = !this.checkSaveAccount;
  }
  savePassword() {
    localStorage.setItem('account', JSON.stringify(this.frmLogin.value));
  }
  switchRegister() {
    this.router.navigate(['register']);
  }
  btnLogin() {
    if (this.checkSaveAccount == true) {
      this.savePassword();
    }
    if (this.frmLogin.invalid) {
      alert('Bạn chưa điền đầy đủ thông tin');
    } else {
      let obj = this.frmLogin.value;
      this.restAPIService
        .add(this.URL_USER + '/customer/login/', obj)
        .subscribe(
          (res) => {
            if (res != null) {
              console.log(res);
              this.login.emit(res);
              this.router.navigate(['shop']);
            } else {
              alert('Sai tài khoản hoặc mật khẩu');
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
