import { Component } from '@angular/core';
import { Globals } from '@belisada-seller/core/services/globals/globals';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <div class="loading" *ngIf="globals.isLoading === true"></div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private globals: Globals) {

  }
}
