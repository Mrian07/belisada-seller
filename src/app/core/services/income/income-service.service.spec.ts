import { TestBed, inject } from '@angular/core/testing';

import { IncomeServiceService } from './income-service.service';

describe('IncomeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncomeServiceService]
    });
  });

  it('should be created', inject([IncomeServiceService], (service: IncomeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
