import { Component } from '@angular/core';
import { Globals } from '@belisada-seller/core/services/globals/globals';
import {BrowserModule, Title} from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <div class="loading" *ngIf="globals.isLoading === true"></div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public globals: Globals, titleService: Title, router: Router, activatedRoute: ActivatedRoute) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log('title', title);
        titleService.setTitle(title);
      }
    });
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
