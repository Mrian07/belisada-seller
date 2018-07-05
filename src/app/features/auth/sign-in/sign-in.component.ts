import { environment } from '@env/environment';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';
import { EmailChecking, SigninRequest, UserData } from '@belisada-seller/core/models';
import { UserService } from '@belisada-seller/core/services';
import { LocalStorageEnum } from '@belisada-seller/core/enum';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /* Mendeklarasikan nama variable*/
  signinFormGroup: FormGroup;
  formSubmited: Boolean = false;
  msg: string;
  emailChecking: EmailChecking = new EmailChecking();
  message: string;
  status: number;
  emailInvalid: number;
  viewPass: Boolean = false;
  isRemember: any;
  userData: UserData = new UserData();
  isLogin: Boolean = false;
  baseUrl: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.baseUrl = environment.baseUrlBuyer;
    if (localStorage.getItem('isRemember') === 'true') {
      this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    } else {
    console.log('userData : ', this.userData);
      if (isPlatformBrowser(this.platformId)) {
        const sess = sessionStorage.getItem(LocalStorageEnum.TOKEN_KEY);
        this.userData = this.userService.getUserData(sess);
      }
    }
    if (this.userData) {
      this.router.navigate(['']);
      this.isLogin = true;
    }
    this.createFormControl();
  }

  // test() {
  //   const testSes = 'testing';
  //   sessionStorage.setItem('id', testSes);
  //   const data = sessionStorage.getItem('id');
  //   sessionStorage.clear();
  //   console.log('apa: ', data);
  // }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.signinFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', Validators.required],
      isRemember: ['']
    });
  }

  /* Fungsi ini untuk melakukan input data sign in dengan melakukan validasi pengecekan email, password */
  onSubmit() {
    const form = this.signinFormGroup;
    this.formSubmited = true;
    if (form.valid) {
      const signinRequest: SigninRequest = form.value;
      console.log('signinRequest: ', signinRequest);
      this.userService.signin(signinRequest).subscribe(
      result => {
        // Handle result
        if (result.status === 0) {
          this.msg = result.message;
        } else {
          const token: string = result.token;

          if (form.value.isRemember === 'true') {
            this.userService.setUserToLocalStorage(token);
            this.userService.setRemember('true');
          } else {
            this.userService.setUserToSessionStorage(token);
            this.userService.setRemember('false');
          }

          this.router.navigate(['']);
        }
      }, error => {
        swal('belisada.co.id', 'unknown error', 'error');
      });
      this.formSubmited = false;
      form.reset();
      form.patchValue({email: signinRequest.email});
    }
  }

  /*Fungsi ini untuk berpindah halaman sign up jika user ingin melakukan pendaftaran*/
  goHome() {
    this.router.navigateByUrl('/');
  }

  /* Fungsi ini untuk melakukan pengecekan email valid*/
  onSearchChange(searchValue: string) {
    const modelz = this.signinFormGroup.value;
    this.emailChecking.email = modelz.email,
    this.userService.checkEmail(this.emailChecking)
    .subscribe(
      data => {
        this.message = data.message;
        this.status = data.status;
        if (data.status === 1) {
          this.emailInvalid = 0;
        } else {
          this.emailInvalid = 1;
        }
      },
      error => {
          console.log('error', error);
      });
  }

  togglePass() {
    this.viewPass = !this.viewPass;
    const el = (<HTMLInputElement>document.getElementById('password'));
    if (this.viewPass) {
      el.type = 'text';
    } else {
      el.type = 'password';
    }
  }

}
