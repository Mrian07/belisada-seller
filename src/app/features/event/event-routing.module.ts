import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event.component';
import { EventTabComponent } from './event-tab/event-tab.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventJoinComponent } from './event-join/event-join.component';
import { EventMyComponent } from './event-my/event-my.component';
import { EventViewComponent } from './event-view/event-view.component';

const routes: Routes = [{
  path: '',
  component: EventComponent,
  children: [{
    path: '',
    component: EventTabComponent,
    children: [{
      path: 'list',
      // pathMatch: 'full',
      component: EventListComponent,
      data: {
        title: 'Active Event'
      }
    }, {
      path: 'myevent',
      // pathMatch: 'full',
      component: EventMyComponent,
      data: {
        title: 'My Event'
      }
    }]
  }, {
    path: 'join',
    pathMatch: 'full',
    component: EventJoinComponent,
    data: {
      title: 'Join Event'
    }
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EventViewComponent,
    data: {
      title: 'View Event'
    }
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
