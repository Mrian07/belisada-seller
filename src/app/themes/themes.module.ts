import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerLayoutComponent } from './layout/seller/seller-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarSellerComponent } from './components/sidebar-seller/sidebar-seller.component';
import { HeadingSellerComponent } from './components/heading-seller/heading-seller.component';
import { FilterPipe } from '../shared/pipes';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AuthLayoutComponent } from '@belisada-seller/themes/layout/auth/auth-layout.component';
import { SideAuthComponent } from '@belisada-seller/themes/components/side-auth/side-auth.component';

library.add(fas, far, fab);

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SideAuthComponent,
  SidebarSellerComponent,
  HeadingSellerComponent,

  SellerLayoutComponent,
  AuthLayoutComponent
];

const PIPES = [
  FilterPipe
];

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [...PIPES, ...COMPONENTS],
  declarations: [...PIPES, ...COMPONENTS]
})
export class ThemesModule { }
