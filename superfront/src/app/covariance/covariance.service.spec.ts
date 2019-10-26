import { TestBed } from '@angular/core/testing';

import { CovarianceService } from './covariance.service';

describe('CovarianceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovarianceService = TestBed.get(CovarianceService);
    expect(service).toBeTruthy();
  });
});
