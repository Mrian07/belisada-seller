import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm, FormBuilder } from '@angular/forms';
import { ResetPasswdRequest } from '@belisada-seller/core/models';
import { UserService } from '@belisada-seller/core/services';
import { PasswordValidation } from '@belisada-seller/shared/validators';
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';

@Component({
  selector: 'bss-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  rstForm: FormGroup;
  data: ResetPasswdRequest = new ResetPasswdRequest;
  msg: string;
  success: boolean;
  field_form: boolean;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private _router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.queryParams.subscribe( params => {
      this.data.key = params.key;
      console.log('key', this.data.key);
      console.log('Message sebelum submit:', this.message);
    });
  }

  createForm() {
    this.rstForm = this.fb.group({
      password: new FormControl('', [
          Validators.required,
          Validators.minLength(7)
      ]),
      confirmPassword: new FormControl('', [
          Validators.required
      ]),
    }, {
        validator: PasswordValidation.MatchPassword,
        updateOn: 'blur'
    });
  }

  /*Fungsi ini untuk melakukan proses reset password*/
  onSubmit(form: NgForm) {
    this.loadingService.show();
    if (this.rstForm.valid) {
      this.data.newPassword = this.rstForm.value.password;
      this.userService.resetPasswd(this.data).subscribe(rsl => {
        this.loadingService.hide();
        this.msg = rsl.message;
        if (rsl.status === 1) {
          this.loadingService.hide();
          this.success = true;
        }
        console.log('Message setelah submit:', this.msg);
      });
    }
  }
}
