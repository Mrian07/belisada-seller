import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssistComponent } from './product-assist.component';
import { HelpListComponent } from './help-list/help-list.component';
import { HelpHistoryComponent } from './help-history/help-history.component';

describe('ProductAssistComponent', () => {
  let component: ProductAssistComponent;
  let fixture: ComponentFixture<ProductAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAssistComponent, HelpListComponent, HelpHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
