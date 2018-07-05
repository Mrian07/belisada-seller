import { ActivationComponent } from './features/activation/activation.component';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './features/profile/profile.component';
import { ProfileSellerComponent } from './features/profile/profile-seller/profile-seller.component';
import { OnlyLoggedInUsersGuard } from '@belisada-seller/core/services';
import { AddProductComponent } from '@belisada-seller/features/product/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivateChild: [OnlyLoggedInUsersGuard],
    children: [
      {
        path: '',
        component: ProfileSellerComponent,
        data: {
          title: ''
        },
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        data: {
          title: ''
        },
      }
    ],
  },
  { path: 'activasi',
    component: ActivationComponent,
    data: {
      title: ''
    },
  },
  { path: 'auth', loadChildren: 'app/features/auth/auth.module#AuthModule' },
  // { path: 'account', loadChildren: 'app/features/auth/auth.module#AuthModule' },
  // { path: 'buyer', loadChildren: 'app/features/buyer/buyer.module#BuyerModule' },
  // { path: 'seller', loadChildren: 'app/features/seller/seller.module#SellerModule' },
  // {
  //   path: 'maintenance',
  //   component: MaintenanceComponent,
  // },
  // {
  //   path: '**',
  //   component: Page404Component,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
