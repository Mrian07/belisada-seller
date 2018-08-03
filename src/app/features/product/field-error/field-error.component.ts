import { Component, Input } from '@angular/core';

@Component({
  selector: 'bss-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent {

    @Input() errorMsg: string;
    @Input() displayError: boolean;

}
