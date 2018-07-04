import { UserService } from '@belisada-seller/core/services';
import { ActivationSeller } from './../../core/models/user/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'bss-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  viewSuccess: boolean;

  data: ActivationSeller = new ActivationSeller;
  msg: string;
  constructor(private router: Router,
    private userService: UserService,
    private route: ActivatedRoute ) { }

  ngOnInit() {

    this.route.queryParams.subscribe( params => {
      this.data.key = params.key;
      this.userService.activationSeller(this.data).subscribe(respon => {

        // console.log('ini', respon.status);
        // this.msg = rsl.message;
        if (respon.status === 1) {
          this.viewSuccess = true;
        } else {
          this.viewSuccess = false;
        }
      });


    });
    // setTimeout(() => {
    //   this.router.navigateByUrl('auth/sign-in');
    // }, 5000);
  }


  login() {
    this.router.navigateByUrl('auth/sign-in');
  }


}
