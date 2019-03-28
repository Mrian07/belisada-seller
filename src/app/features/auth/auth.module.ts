import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '@belisada-seller/features/auth/auth-routing.module';
import { AuthComponent } from '@belisada-seller/features/auth/auth.component';
import { SignInComponent } from '@belisada-seller/features/auth/sign-in/sign-in.component';
import { ThemesModule } from '@belisada-seller/themes/themes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

library.add(fas, far, fab);

@NgModule({
  imports: [
    CommonModule,
    ThemesModule,
    FontAwesomeModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthComponent, SignInComponent, ForgotPasswordComponent, ResetPasswordComponent]
})
export class AuthModule { }
