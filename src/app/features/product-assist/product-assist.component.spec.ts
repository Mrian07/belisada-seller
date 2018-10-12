import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssistComponent } from './product-assist.component';

describe('ProductAssistComponent', () => {
  let component: ProductAssistComponent;
  let fixture: ComponentFixture<ProductAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAssistComponent ]
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
