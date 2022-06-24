import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductCategoryComponent } from './manage-product/manage-product-category/manage-product-category.component';
import { ManageProductSizeComponent } from './manage-product/manage-product-size/manage-product-size.component';
import { ProductAddComponent } from './manage-product/product-add/product-add.component';
import { ProductEditComponent } from './manage-product/product-edit/product-edit.component';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrderNewComponent } from './admin-order/admin-order-new/admin-order-new.component';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { ManageProviderComponent } from './manage-provider/manage-provider.component';
import { ManageFeebackComponent } from './manage-feeback/manage-feeback.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'manage-products',
        loadChildren: () =>
          import('./manage-product/manage-product.module').then(
            (m) => m.ManageProductModule
          ),
      },
      {
        path: 'manage-orders',
        loadChildren: () =>
          import('./admin-order/admin-order.module').then(
            (m) => m.AdminOrderModule
          ),
      },
      { path: 'manage-categories', component: ManageCategoryComponent },
      { path: 'manage-brand', component: ManageBrandComponent },
      { path: 'manage-provider', component: ManageProviderComponent },
      { path: 'list-customer', component: AdminCustomerComponent },
      { path: 'feeback', component: ManageFeebackComponent },
      // {path: 'cart/shop', component: ShopComponent},
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      // {path: '**',component: NotFoundComponent}
    ],
  },
];

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ManageProductComponent,
    ManageCategoryComponent,
    ManageProductCategoryComponent,
    ManageProductSizeComponent,
    ProductAddComponent,
    ProductEditComponent,
    ManageBrandComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminOrderComponent,
    AdminOrderNewComponent,
    AdminCustomerComponent,
    ManageProviderComponent,
    ManageFeebackComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PagesModule {}
