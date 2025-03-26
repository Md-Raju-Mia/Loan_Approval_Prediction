import { TestBed } from '@angular/core/testing';

import { LoanPredictionService } from './loan-prediction.service';

describe('LoanPredictionService', () => {
  let service: LoanPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
