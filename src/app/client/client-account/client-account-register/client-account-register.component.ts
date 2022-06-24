import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-client-account-register',
  templateUrl: './client-account-register.component.html',
  styleUrls: ['./client-account-register.component.css'],
})
export class ClientAccountRegisterComponent implements OnInit {
  constructor(private router: Router, private restAPIService: RestAPIService) {}

  ngOnInit(): void {
    this.loginAccount();
  }

  URL_USER: string = 'http://localhost:1111/api/user';
  frmCustomer: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    postcode: new FormControl(),
    status: new FormControl(0),
    createDate: new FormControl(new Date()),
  });
  checkAccount: boolean = false;
  customer: Customer = new Customer();

  switchLogin() {
    this.router.navigate(['login']);
  }
  switchShop() {
    this.router.navigate(['shop']);
  }
  btnCheckAccount() {
    this.checkAccount = !this.checkAccount;
    console.log(this.checkAccount);
  }
  loginAccount() {
    if (localStorage.getItem('customer') != null) {
      this.customer = JSON.parse(localStorage.getItem('customer') || '[]');
    }
  }
  btnUpadate(frmCustomer: any) {
    if (this.frmCustomer.invalid) {
      alert('Bạn chưa điền đầy đủ thông tin');
    } else {
      this.customer.firstName = this.frmCustomer.value.firstName;
      this.customer.lastName = this.frmCustomer.value.lastName;
      this.customer.email = this.frmCustomer.value.email;
      this.customer.phone = this.frmCustomer.value.phone;
      this.customer.country = this.frmCustomer.value.country;
      this.customer.city = this.frmCustomer.value.city;
      this.customer.email = this.frmCustomer.value.email;
      this.customer.streetAddress = this.frmCustomer.value.streetAddress;
      this.customer.postcode = this.frmCustomer.value.postcode;
      this.restAPIService
        .edit(this.URL_USER + '/customer', this.customer)
        .subscribe((res) => {});
    }

    // console.log(this.order);
  }
}
