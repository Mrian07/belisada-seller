import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductMasterComponent } from './search-product-master.component';

describe('SearchProductMasterComponent', () => {
  let component: SearchProductMasterComponent;
  let fixture: ComponentFixture<SearchProductMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
