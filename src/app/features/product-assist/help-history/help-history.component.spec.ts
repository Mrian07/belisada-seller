import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpHistoryComponent } from './help-history.component';

describe('HelpHistoryComponent', () => {
  let component: HelpHistoryComponent;
  let fixture: ComponentFixture<HelpHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
