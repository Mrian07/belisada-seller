import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNumberComponent } from './invoice-number.component';

describe('InvoiceNumberComponent', () => {
  let component: InvoiceNumberComponent;
  let fixture: ComponentFixture<InvoiceNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
