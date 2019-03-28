import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventActiveComponent } from './event-active.component';

describe('EventActiveComponent', () => {
  let component: EventActiveComponent;
  let fixture: ComponentFixture<EventActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
