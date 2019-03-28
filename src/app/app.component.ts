import { Component, OnInit } from '@angular/core';
import { Globals } from '@belisada-seller/core/services/globals/globals';
import {BrowserModule, Title} from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ChatService } from './core/services/globals/chat.service';
import { MessagingService } from './shared/messaging.service';
@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <div class="loading" *ngIf="globals.isLoading == true"></div>
    <div class="chat-wrapper" *ngIf="globals.showChat === true">
      <app-chat></app-chat>
    <div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  message;

  constructor(
    public globals: Globals,
    titleService: Title,
    router: Router,
    activatedRoute: ActivatedRoute,
    _chatService: ChatService,
    private messagingService: MessagingService,
    ) {
    globals.socket = _chatService.connectSocket();
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log('title', title);
        titleService.setTitle(title);
      }
    });
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
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
