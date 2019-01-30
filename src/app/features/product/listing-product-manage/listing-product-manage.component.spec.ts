import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingProductManageComponent } from './listing-product-manage.component';

describe('ListingProductManageComponent', () => {
  let component: ListingProductManageComponent;
  let fixture: ComponentFixture<ListingProductManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingProductManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingProductManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
