import { Component, OnInit } from '@angular/core';
import { RekeningService } from '@belisada-seller/core/services';

@Component({
  selector: 'bss-rekening',
  templateUrl: './rekening.component.html',
  styleUrls: ['./rekening.component.scss']
})
export class RekeningComponent implements OnInit {

  constructor(
    private rekeningService: RekeningService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const type = 2;
    this.rekeningService.getRekening(type).subscribe(respon => {
      console.log(respon);
    });
  }

}
