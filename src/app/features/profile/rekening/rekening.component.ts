import { Component, OnInit, ElementRef } from '@angular/core';
import { RekeningService } from '@belisada-seller/core/services';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  RekeningRespon, AddRekeningRequest, RekeningUser
} from '@belisada-seller/core/models';
import swal from 'sweetalert2';

@Component({
  selector: 'bss-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {
  createComForm: FormGroup;
  popRek: Boolean = false;
  onBankFocus: Boolean = false;
  rekeningList: RekeningRespon[];
  rekList: RekeningUser[];
  formSubmited: Boolean = false;
  account: boolean;

  constructor(
    private rekeningService: RekeningService,
    private fb: FormBuilder,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    this.loadData();
    this.formData();

    this.rekeningService.getBankUser().subscribe(respon => {
      this.rekList = respon;
    });
  }

  loadData() {
    const type = 2;
    this.rekeningService.getRekening(type).subscribe(respon => {
      this.rekeningList = respon;
    });
  }

  onBankBlur(): void {
    setTimeout(() => { this.onBankFocus = false; }, 200);
  }

  private formData() {
    this.createComForm = this.fb.group({
      bankAccountId: [''],
      bankId: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      bankName: ['', [Validators.required]]
    });
  }

  addRekening() {
    this.popRek = true;
    this.createComForm.patchValue({
      bankAccountId: '',
      bankId: '',
      accountName: '',
      accountNumber: '',
      bankName: ''
    });
  }

  editBank(item) {
    this.popRek = true;
    this.createComForm.patchValue({
      bankAccountId: item.bankAccountId,
      bankId: item.bankId,
      bankName: item.bankName,
      accountNumber: item.accountNumber,
      accountName: item.accountName,
    });
  }

  deleteBank(id) {

    swal({
      title: 'Alert',
      text: 'Anda yakin akan menghapus akun bank?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.rekeningService.deleteRekening(id).subscribe(respon => {
          this.loadData();
        });
      }
    });
  }

  selectBank(bank) {
    this.createComForm.patchValue({
      bankId: bank.bankId,
      bankName: bank.name
    });
  }

  cancel() {
    this.popRek = false;
  }


  onSubmit() {
    console.log('asdasd');
    const form = this.createComForm;
    this.formSubmited = true;
    const data: AddRekeningRequest = new AddRekeningRequest();
    data.accountType = '2';
    data.bankAccountId = this.createComForm.value.bankAccountId;
    data.accountNumber = this.createComForm.value.accountNumber;
    data.accountName = this.createComForm.value.accountName;
    data.bankId = this.createComForm.value.bankId;
    data.bankName = this.createComForm.value.bankName;
    if (form.valid) {
      const type = 2;
      // this.rekeningService.getRekening(type).subscribe(respon => {
      //   this.rekeningList = respon;
      //   const account = respon.find(x => x.bankName === this.createComForm.value.bankName
      //     && x.accountNumber === this.createComForm.value.accountNumber);
      //   if (account) {
      //     swal({
      //       title: 'Alert',
      //       text: 'Nomor rekening sudah terdaftar dalam rekening anda!',
      //       type: 'warning',
      //       showCancelButton: false,
      //       confirmButtonText: 'OK',
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33'
      //     });
      //     return;
      //   }
      //   this.formSubmited = false;
      // });

      if (this.createComForm.value.bankAccountId) {
        this.rekeningService.editRekening(data).subscribe(respon2 => {
          if (respon2.status === 0) {
            swal({
              title: 'Alert',
              text: 'Nomor rekening yang sama sudah ada dalam rekening anda!',
              type: 'warning',
              showCancelButton: false,
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33'
            });
            return;
          }
          this.loadData();
          this.popRek = false;
        });
      } else {
        // console.log('Respon atas: ', respon);
        this.rekeningService.addRekening(data).subscribe(respon2 => {
          if (respon2.status === 0) {
            swal({
              title: 'Alert',
              text: 'Nomor rekening yang sama sudah ada dalam rekening anda!',
              type: 'warning',
              showCancelButton: false,
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33'
            });
            return;
          }
          this.loadData();
          this.popRek = false;
        });
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
