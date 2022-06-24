import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  product: Products = new Products();


}
