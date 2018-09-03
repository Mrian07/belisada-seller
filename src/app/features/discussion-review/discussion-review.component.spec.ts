import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionReviewComponent } from './discussion-review.component';

describe('DiscussionReviewComponent', () => {
  let component: DiscussionReviewComponent;
  let fixture: ComponentFixture<DiscussionReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
