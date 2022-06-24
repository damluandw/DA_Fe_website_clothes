import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { RestAPIService } from 'src/app/servers/rest-api.service';

export function ValidateCompare(compareWith: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let controlCompare = control.parent?.get(compareWith);
    if (controlCompare?.value != control.value) {
      return { compare: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css'],
})
export class ClientRegisterComponent implements OnInit {
  constructor(private router: Router, private restAPIService: RestAPIService) {}
  ngOnInit(): void {
    this.readLocalStorage();
  }

  URL_USER: string = 'http://localhost:1111/api/user';
  orderHistory: Order = new Order();
  customer: Customer = new Customer();
  frmRegister: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [
      Validators.required,
      ValidateCompare('password'),
    ]),
  });

  readLocalStorage() {
    if (localStorage.getItem('orderHistory') != null) {
      this.orderHistory = JSON.parse(
        localStorage.getItem('orderHistory') || '[]'
      );
    }
  }

  switchLogin() {
    this.router.navigate(['login']);
  }

  btnRegister(frmRegister: any) {
    if (frmRegister.invalid) {
      alert('Bạn chưa điền đầy đủ thông tin');
    } else {
      this.customer.email = frmRegister.value.email;
      this.customer.password = frmRegister.value.password;
      this.restAPIService
        .add(this.URL_USER + '/customer', this.customer)
        .subscribe(
          (res) => {
            alert('Đăng ký thành công');
            this.switchLogin();
          },
          (err) => {
            alert('Email đã được sử dụng');
          }
        );
    }
  }
}
