import { TestingServicesService } from './../../../core/services/testService/testing-services.service';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModelsComponent implements OnInit {
  // @HostBinding('class.is-open')
  @Input() myFunction: Function;
  @Input() closable = true;
  @Input() visible: boolean;
  @Input() maxwidth: number;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor (private _messageService: TestingServicesService) { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    sessionStorage.setItem('boolean', 'false');
    const data = sessionStorage.getItem('boolean');
    this._messageService.filter('Register click');
    console.log('asdasdas');
  }

}
