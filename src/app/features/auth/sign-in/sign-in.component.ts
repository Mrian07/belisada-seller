import { environment } from '@env/environment';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
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

  token: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['token']) {
        localStorage.setItem(LocalStorageEnum.TOKEN_KEY, params['token']);
        this.userService.refreshToken().subscribe(
          respon => {
            if (respon.role === 4 || respon.role === 5 || respon.role === 6 || respon.role === 7) {
              this.userService.setUserToLocalStorage(respon.token);
              this.router.navigate(['']);
              this.isLogin = true;
            }
            console.log('hasilnya', respon);
          },
          error => {
              console.log('error', error);
          });

      } else {
        this.createFormControl();
      }
    });

    // this.baseUrl = environment.baseUrlBuyer;
    // this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    // if (this.userData) {
    //   this.router.navigate(['']);
    //   this.isLogin = true;
    // }
    // this.createFormControl();
  }

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

          this.userService.setUserToLocalStorage(token);

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

  goIndex() {
    alert('sssss');
    this.router.navigateByUrl('http://dev.belisada.id');
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
