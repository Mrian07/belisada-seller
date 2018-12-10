import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductMasterComponent } from './search-product-master.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
// import { RecaptchaModule, RecaptchaLoaderService } from 'ng-recaptcha';

describe('SearchProductMasterComponent', () => {
  let component: SearchProductMasterComponent;
  let fixture: ComponentFixture<SearchProductMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductMasterComponent ],
      imports: [
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
