import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSellerComponent } from './income-seller.component';

describe('IncomeSellerComponent', () => {
  let component: IncomeSellerComponent;
  let fixture: ComponentFixture<IncomeSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
