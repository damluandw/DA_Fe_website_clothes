import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsServiceService } from 'src/app/servers/products-service.service';
import { RestAPIService } from 'src/app/servers/rest-api.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  routerActive: String = 'add';
}
