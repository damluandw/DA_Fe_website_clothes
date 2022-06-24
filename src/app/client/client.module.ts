import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientShopDetailComponent } from './client-shop-detail/client-shop-detail.component';
import { ClientBlogComponent } from './client-blog/client-blog.component';
import { ClientBlogDetailComponent } from './client-blog-detail/client-blog-detail.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientCheckoutComponent } from './client-checkout/client-checkout.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientCartComponent } from './client-cart/client-cart.component';
import { ClientComponent } from './client.component';
import { ClientShopComponent } from './client-shop/client-shop.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { ClientFooterComponent } from './client-footer/client-footer.component';
import { ClientHistoryComponent } from './client-history/client-history.component';
import { ClientAccountComponent } from './client-account/client-account.component';
import { ClientAccountInformationComponent } from './client-account/client-account-information/client-account-information.component';
import { ClientHistoryCartDetailComponent } from './client-history-cart-detail/client-history-cart-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'home', component: ClientHomeComponent },
      { path: 'shop', component: ClientShopComponent },
      { path: 'shop/search/:search', component: ClientShopComponent },
      { path: 'shop/details/:id/:name', component: ClientShopDetailComponent },
      { path: 'cart', component: ClientCartComponent },
      { path: 'checkout', component: ClientCheckoutComponent },
      { path: 'blog', component: ClientBlogComponent },
      { path: 'blog/details/:id', component: ClientBlogDetailComponent },
      { path: 'login', component: ClientLoginComponent },
      { path: 'register', component: ClientRegisterComponent },
      { path: 'history', component: ClientHistoryComponent },
      { path: 'history/:id', component: ClientHistoryCartDetailComponent },
      {
        path: 'account',
        component: ClientAccountComponent,
        loadChildren: () =>
          import('./client-account/client-account.module').then(
            (m) => m.ClientAccountModule
          ),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientShopDetailComponent,
    ClientShopComponent,
    ClientBlogComponent,
    ClientBlogDetailComponent,
    ClientLoginComponent,
    ClientCheckoutComponent,
    ClientRegisterComponent,
    ClientCartComponent,
    ClientComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    ClientHistoryComponent,
    ClientAccountComponent,
    ClientAccountInformationComponent,
    ClientHistoryCartDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule {}
