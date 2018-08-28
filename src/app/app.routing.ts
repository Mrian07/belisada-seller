import { ActivationComponent } from './features/activation/activation.component';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './features/profile/profile.component';
import { ProfileSellerComponent } from './features/profile/profile-seller/profile-seller.component';
import { OnlyLoggedInUsersGuard } from '@belisada-seller/core/services';
import { AddProductComponent } from '@belisada-seller/features/product/add-product/add-product.component';
import { ListingProductComponent } from '@belisada-seller/features/product/listing-product/listing-product.component';
import { OrderComponent } from '@belisada-seller/features/order/order.component';
import { OrderPrintComponent } from '@belisada-seller/features/order-print/order-print.component';
import { InvoiceNumberComponent } from '@belisada-seller/features/order-list/invoice/invoice-number/invoice-number.component';
import { DiscussionReviewComponent } from '@belisada-seller/features/discussion-review/discussion-review.component';
import { DiscussionComponent } from '@belisada-seller/features/discussion/discussion.component';
import { ReviewComponent } from '@belisada-seller/features/review/review.component';

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
      },
      {
        path: 'edit-product/:id',
        component: AddProductComponent,
        data: {
          title: ''
        },
      },
      {
        path: 'listing-product',
        component: ListingProductComponent,
        data: {
          title: 'listing-product'
        },
      },
      {
        path: 'listing-order',
        component: OrderComponent,
        data: {
          title: 'listing-order'
        },
      },
      {
        path: 'discussion-review',
        component: DiscussionReviewComponent,
        data: {
          title: 'discussion-review'
        },
      },
      {
        path: 'discussion',
        component: DiscussionComponent,
        data: {
          title: 'discussion'
        },
      },
      {
        path: 'review',
        component: ReviewComponent,
        data: {
          title: 'review'
        },
      },
    ],
  },
  { path: 'activation',
    component: ActivationComponent,
    data: {
      title: ''
    },
  },
  {
    path: 'print-order',
    component: OrderPrintComponent,
    data: {
      title: ''
    },
  },
  {
    path: 'invoice-number/:id',
    component: InvoiceNumberComponent,
    data: {
      title: 'invoice-number'
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
