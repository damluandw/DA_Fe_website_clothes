import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ManageProductComponent } from './manage-product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ManageProductCategoryComponent } from './manage-product-category/manage-product-category.component';
import { ManageProductSizeComponent } from './manage-product-size/manage-product-size.component';
import { ManageProductColorComponent } from './manage-product-color/manage-product-color.component';
import { AdminProductDetailComponent } from './admin-product-detail/admin-product-detail.component';
import { ManageProductStyleComponent } from './manage-product-style/manage-product-style.component';

const routes: Routes = [
  {  path: '', component: ManageProductComponent,
    children: [
      { path: 'add', component: ProductAddComponent},
      { path: 'edit', component: ProductEditComponent},
      { path: 'view/:id', component: ProductEditComponent},
      { path: 'map-product-categories', component: ManageProductCategoryComponent},
      { path: 'map-product-size', component: ManageProductSizeComponent},
      { path: 'map-product-color', component: ManageProductColorComponent},
      { path: 'map-product-style', component: ManageProductStyleComponent},
    ]
   }
];

@NgModule({
  declarations: [
    ManageProductColorComponent,
    AdminProductDetailComponent,
    ManageProductStyleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageProductModule { }
