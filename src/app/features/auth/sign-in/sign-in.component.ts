import { environment } from '@env/environment';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';
import { EmailChecking, SigninRequest, UserData, CheckStoreRequest } from '@belisada-seller/core/models';
import { UserService, AuthService, StoreService } from '@belisada-seller/core/services';
import { LocalStorageEnum } from '@belisada-seller/core/enum';
import { isPlatformBrowser } from '@angular/common';
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  serverMessage: String;
  nameChecking: Boolean = false;
  pending_submit: Boolean = false;
  public validationOnpopUpCreateStore: FormGroup;
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

  tabMenu = 'login';
  public regFromGroup: FormGroup;
  storeUrl: FormControl;
  storeName: FormControl;
  regSuccess: boolean;
  regForm: boolean;
  routeback: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private authService: AuthService,
    private userS: UserService,
    private storeService: StoreService,
  ) {}

  ngOnInit() {
    this.flagStatus();
    this.createFormRegControl();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.routeback = params.routeback || '';
      if (params['token']) {
        localStorage.setItem(LocalStorageEnum.TOKEN_KEY, params['token']);
        this.userService.refreshToken().subscribe(
          respon => {
            if (respon.role === 4 || respon.role === 5 || respon.role === 6 || respon.role === 7) {
              this.userService.setUserToLocalStorage(respon.token);
              this.router.navigate(['']);
              this.isLogin = true;
            }
            // console.log('hasilnya', respon);
          },
          error => {
            // console.log('error', error);
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

  onNameKeydown(event: any) {
    const pattern = /[a-zA-Z 0-9\+\- ]+/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }

    this.regFromGroup.get('name').valueChanges.subscribe(val => {
      val = val.replace(/\s+/g, '_').toLowerCase();
      this.regFromGroup.patchValue({
        storeUrl: val
      });
    });
  }

  flagStatus() {
    this.regForm = false;
    this.regSuccess = false;
  }

  createFormRegControl() {
    this.storeName = new FormControl('', Validators.required);
    this.storeUrl = new FormControl('', Validators.required);
    this.regFromGroup = this.fb.group({
        nameOwner: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        storeUrl: this.storeUrl,
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(7)
        ]),
    });
  }

  tab(data) {
    this.tabMenu = data;
    this.regForm = true;
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
      this.userService.signin(signinRequest).subscribe(result => {
        // Handle result
        if (result.status === 0) {
          this.msg = result.message;
        } else {
          const token: string = result.token;

          this.userService.setUserToLocalStorage(token);

          this.router.navigateByUrl(this.routeback);
        }
      }, error => {
        swal('belisada.co.id', 'unknown error', 'error');
      });
      this.formSubmited = false;
      form.reset();
      form.patchValue({email: signinRequest.email});
    }
  }

  onRegistrasi() {

    if (this.regFromGroup.valid) {
        const model = this.regFromGroup.value;

        this.userS.createFormGuest(model).subscribe(rsl => {
            if (rsl.status === 1) {
                    // swal(rsl.message);
                  this.flagStatus();
                  this.regSuccess = true;

                  this.regFromGroup.patchValue(
                    {
                      nameOwner: '',
                      name: '',
                      storeUrl: '',
                      email: '',
                      password: '',
                    });


            } else {
                  swal(rsl.message);
            }
        });
    } else {
        swal('ops maaf ada kesalahan');
        this.validateAllFormFields(this.regFromGroup);
    }


    // this.flagStatus();
    // const form = this.regFromGroup;
    // this.formSubmited = true;
    // console.log(form.invalid);

    // if (form.invalid) {
    //   this.regForm = true;
    //   return;
    // } else {

    //   if (this.regFromGroup.valid) {
    //       const model = this.regFromGroup.value;
    //       this.userS.createFormGuest(model).subscribe(rsl => {
    //           if (rsl.status === 1) {
    //                 this.flagStatus();
    //                 this.regSuccess = true;
    //           } else {
    //             this.regForm = true;
    //             swal(rsl.message);
    //           }
    //       });
    //   } else {
    //       swal('ops maaf ada kesalahan');
    //       this.validateAllFormFields(this.regFromGroup);
    //   }

    // }
    // this.formSubmited = false;
    // form.reset();
  }

  isFieldValid(field: string) {
    console.log('get:', field);
    return !this.regFromGroup.get(field).valid && this.regFromGroup.get(field).touched;
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

  googleLogin() {
    this.loadingService.show();
    this.authService.doGoogleLogin()
    .then(res => {
      const signinRequest: SigninRequest = new SigninRequest();
      signinRequest.email = res.additionalUserInfo.profile.email;
      signinRequest.avatar = res.additionalUserInfo.profile.picture;
      signinRequest.loginType = 'social';
      signinRequest.name = res.additionalUserInfo.profile.name;
      signinRequest.socialName = res.additionalUserInfo.providerId;
      signinRequest.socialToken = res.credential.idToken;
      // signinRequest.userType = res.additionalUserInfo.profile.email;
      this.userService.signin(signinRequest).subscribe(result => {
        this.loadingService.hide();
        // Handle result
        if (result.status === 1) {
          const token: string = result.token;
          this.userService.setUserToLocalStorage(token);
          this.router.navigate(['']);
        } else {
          this.msg = result.message;
          // swal('belisada.co.id', result.message, 'error');
        }
      }, error => {
        this.loadingService.hide();
        swal('belisada.co.id', 'unknown error', 'error');
      });
    }, err => {
      this.loadingService.hide();
      console.log('googleLogin-err: ', err);
    });
  }

  facebookLogin() {
    this.loadingService.show();
    this.authService.doFacebookLogin()
    .then(res => {
      // console.log('facebookLogin-res: ', res);
      const signinRequest: SigninRequest = new SigninRequest();
      signinRequest.email = res.additionalUserInfo.profile.email;
      signinRequest.avatar = res.additionalUserInfo.profile.picture.data.url;
      signinRequest.loginType = 'social';
      signinRequest.name = res.additionalUserInfo.profile.name;
      signinRequest.socialName = res.additionalUserInfo.providerId;
      signinRequest.socialToken = res.credential.idToken;
      // signinRequest.userType = res.additionalUserInfo.profile.email;
      this.userService.signin(signinRequest).subscribe(result => {
        this.loadingService.hide();
        // Handle result
        if (result.status === 1) {
          const token: string = result.token;
          this.userService.setUserToLocalStorage(token);
          this.router.navigate(['']);
        } else {
          this.msg = result.message;
          // swal('belisada.co.id', result.message, 'error');
        }
      }, error => {
        this.loadingService.hide();
        swal('belisada.co.id', 'unknown error', 'error');
      });
    }, err => {
      this.loadingService.hide();
      console.log('facebookLogin-err: ', err);
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({
                onlySelf: true
            });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
        }
    });

  }


  checkStoreName() {
    const check_data: CheckStoreRequest = new CheckStoreRequest();
    check_data.name = this.storeName.value;
    this.storeService.isExist(check_data).subscribe(rsl => {
        if (rsl.status !== 1) {
            this.storeName.setErrors({
                'server': true
            });
            this.serverMessage = rsl.message;
        }
        this.nameChecking = false;
        if (this.pending_submit) {
            this.onRegistrasi();
            this.pending_submit = false;
        }
    }, err => {
        this.nameChecking = false;
        this.storeName.setErrors({
            'server': true
        });
      //   this.serverMessage = 'opps, please try again';
    });
  }

}
