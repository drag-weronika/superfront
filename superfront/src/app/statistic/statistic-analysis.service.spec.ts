import { TestBed } from '@angular/core/testing';

import { StatisticAnalysisService } from './statistic-analysis.service';

describe('StatisticAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticAnalysisService = TestBed.get(StatisticAnalysisService);
    expect(service).toBeTruthy();
  });
});
