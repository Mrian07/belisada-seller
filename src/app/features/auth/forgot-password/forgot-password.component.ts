import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import swal from 'sweetalert2';

import { EmailChecking, SendEmailRequest } from '@belisada-seller/core/models';
import { UserService } from '@belisada-seller/core/services';
import { SendEmailTypeEnum } from '@belisada-seller/core/enum';

@Component({
  selector: 'bss-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  fogotFormGroup: FormGroup;

  email: string;
  success: boolean;
  msg: string;
  emailChecking: EmailChecking = new EmailChecking();
  message: string;
  status: number;
  emailInvalid: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.createFormControl();
    this.success = false;

  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.fogotFormGroup = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ])
    });
  }

  /*Fungsi untuk melakukan request reset password dengan memasukan email terdaftar*/
  onSubmit() {
    // if (this.email.valid) {
    // delete this.msg;
    // const data: SendEmailRequest = new SendEmailRequest();
    // data.email = this.email.value;
    // data.type = SendEmailTypeEnum.RESET_PASSWORD;
    // this.userService.sendEmail(data).subscribe(rsl => {
    //     if (rsl.status === 1) {
    //       this.success = true;
    //     } else {
    //       this.msg = rsl.message;
    //     }
    //   });
    // }

    delete this.msg;
    const data: SendEmailRequest = this.fogotFormGroup.value;
    data.type = SendEmailTypeEnum.RESET_PASSWORD_SELLER;
    this.userService.sendEmail(data).subscribe(
    result => {
      // Handle result
      console.log('resulttttt: ', result);
      if (result.status === 1) {
        this.email = data.email;
        this.success = true;
      } else {
        this.msg = result.message;
      }
    },
    error => {
      swal('belisada.co.id', 'unknown error', 'error');
      }
    );


  }

   /* Fungsi ini untuk melakukan pengecekan email valid*/
   onSearchChange(searchValue: string) {
    const modelz = this.fogotFormGroup.value;
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

}



// export class ForgotPasswordComponent implements OnInit {

//   fogotFormGroup: FormGroup;

//   email: string;
//   success: boolean;
//   msg: string;
//   emailChecking: EmailChecking = new EmailChecking();
//   message: string;
//   status: number;
//   emailInvalid: number;

//   constructor(
//     private router: Router,
//     private userService: UserService,
//     private fb: FormBuilder,
//   ) { }

//   ngOnInit() {

//     this.createFormControl();
//     this.success = false;

//   }

//   /* Fungsi untuk membuat nama field pada form */
//   createFormControl() {
//     this.fogotFormGroup = this.fb.group({
//     email: new FormControl('', [
//       Validators.required,
//       Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
//     ])
//     });
//   }

//   /*Fungsi untuk melakukan request reset password dengan memasukan email terdaftar*/
//   onSubmit() {
//     // if (this.email.valid) {
//     // delete this.msg;
//     // const data: SendEmailRequest = new SendEmailRequest();
//     // data.email = this.email.value;
//     // data.type = SendEmailTypeEnum.RESET_PASSWORD;
//     // this.userService.sendEmail(data).subscribe(rsl => {
//     //     if (rsl.status === 1) {
//     //       this.success = true;
//     //     } else {
//     //       this.msg = rsl.message;
//     //     }
//     //   });
//     // }

//     delete this.msg;
//     const data: SendEmailRequest = this.fogotFormGroup.value;
//     data.type = SendEmailTypeEnum.RESET_PASSWORD;
//     this.userService.sendEmail(data).subscribe(
//     result => {
//       // Handle result
//       if (result.status === 1) {
//         this.email = data.email;
//         this.success = true;
//       } else {
//         this.msg = result.message;
//       }
//     },
//     error => {
//       swal('belisada.co.id', 'unknown error', 'error');
//       }
//     );


//   }

//    /* Fungsi ini untuk melakukan pengecekan email valid*/
//    onSearchChange(searchValue: string) {
//     const modelz = this.fogotFormGroup.value;
//     this.emailChecking.email = modelz.email,
//     this.userService.checkEmail(this.emailChecking)
//     .subscribe(
//       data => {
//         this.message = data.message;
//         this.status = data.status;
//         if (data.status === 1) {
//           this.emailInvalid = 0;
//         } else {
//           this.emailInvalid = 1;
//         }
//       },
//       error => {
//           console.log('error', error);
//       });
//   }

// }
