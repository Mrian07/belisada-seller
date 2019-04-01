import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { ThemesModule } from '@belisada-seller/themes/themes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { EventTabComponent } from './event-tab/event-tab.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventJoinComponent } from './event-join/event-join.component';
import { EventMyComponent } from './event-my/event-my.component';
import { EventViewComponent } from './event-view/event-view.component';

@NgModule({
  imports: [
    CommonModule,
    ThemesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EventRoutingModule
  ],
  declarations: [EventComponent, EventTabComponent, EventListComponent, EventJoinComponent, EventMyComponent, EventViewComponent]
})
export class EventModule { }
