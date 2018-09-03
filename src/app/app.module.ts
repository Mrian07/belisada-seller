import { ActivationComponent } from './features/activation/activation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FeaturesModule } from './features';
import { ProfileComponent } from '@belisada-seller/features/profile/profile.component';
import { ProfileSellerComponent } from '@belisada-seller/features/profile/profile-seller/profile-seller.component';
import { ThemesModule } from '@belisada-seller/themes/themes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@belisada-seller/core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from '@belisada-seller/core/interceptors';
import { AddProductComponent } from '@belisada-seller/features/product/add-product/add-product.component';
import { ListingProductComponent } from '@belisada-seller/features/product/listing-product/listing-product.component';
import { OrderComponent } from '@belisada-seller/features/order/order.component';
import { OrderListComponent } from '@belisada-seller/features/order-list/order-list.component';
import { FieldErrorComponent } from '@belisada-seller/features/product/field-error/field-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiscussionReviewComponent } from '@belisada-seller/features/discussion-review/discussion-review.component';
import { DiscussionComponent } from '@belisada-seller/features/discussion/discussion.component';
import { ReviewComponent } from '@belisada-seller/features/review/review.component';

library.add(fas, far, fab);

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrderListComponent,
    ProfileComponent,
    ProfileSellerComponent,
    AddProductComponent,
    ActivationComponent,
    ListingProductComponent,
    FieldErrorComponent,
    DiscussionReviewComponent,
    DiscussionComponent,
    ReviewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    FeaturesModule,
    ThemesModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
