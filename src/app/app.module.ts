import { ActivationComponent } from './features/activation/activation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF, registerLocaleData } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiscussionReviewComponent } from '@belisada-seller/features/discussion-review/discussion-review.component';
import { DiscussionComponent } from '@belisada-seller/features/discussion/discussion.component';
import { ReviewComponent } from '@belisada-seller/features/review/review.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireMessagingModule } from 'angularfire2/messaging';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '@env/environment';
import { SharedModule } from '@belisada-seller/shared/shared.module';
import { ProfileInformationComponent } from '@belisada-seller/features/profile/profile-information/profile-information.component';
import { RekeningComponent } from '@belisada-seller/features/profile/rekening/rekening.component';
import { ProductAssistComponent } from './features/product-assist/product-assist.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store';
import { ProductsSandbox } from './features/product/products.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './core/store/effects/product.effect';
import { SearchProductMasterComponent } from './features/product/search-product-master/search-product-master.component';
import { AddProductV2Component } from './features/product/add-product-v2/add-product-v2.component';
import { ProductsResolver } from './features/product/product.resolver';
import localeId from '@angular/common/locales/id';
import { ListingProductManageComponent } from './features/product/listing-product-manage/listing-product-manage.component';
import { ChatComponent } from './features/chat/chat.component';
import { MessagingService } from './shared/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';

import { OrderModule } from 'ngx-order-pipe';
// import { reducer } from './core/store/reducer/product-detail.reducer';
library.add(fas, far, fab);

registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrderListComponent,
    ListingProductManageComponent,
    ProfileComponent,
    ProfileSellerComponent,
    AddProductComponent,
    ActivationComponent,
    ListingProductComponent,
    DiscussionReviewComponent,
    DiscussionComponent,
    ReviewComponent,
    ProfileInformationComponent,
    RekeningComponent,
    ProductAssistComponent,
    SearchProductMasterComponent,
    AddProductV2Component,
    ChatComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AppRoutingModule,
    FeaturesModule,
    ThemesModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    OrderModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProductsEffects]),
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
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
    ProductsSandbox,
    ProductsResolver,
    { provide: LOCALE_ID, useValue: 'id' },
    MessagingService,
    AsyncPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
