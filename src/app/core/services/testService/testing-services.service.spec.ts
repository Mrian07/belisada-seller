import { TestBed, inject } from '@angular/core/testing';

import { TestingServicesService } from './testing-services.service';

describe('TestingServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestingServicesService]
    });
  });

  it('should be created', inject([TestingServicesService], (service: TestingServicesService) => {
    expect(service).toBeTruthy();
  }));
});
