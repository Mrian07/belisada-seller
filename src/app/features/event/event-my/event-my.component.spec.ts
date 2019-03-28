import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMyComponent } from './event-my.component';

describe('EventMyComponent', () => {
  let component: EventMyComponent;
  let fixture: ComponentFixture<EventMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
