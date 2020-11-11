import { TestBed } from '@angular/core/testing';

import { EpIntersectionObserverStatusService } from './ep-intersection-observer-status.service';

describe('EpIntersectionObserverStatusService', () => {
  let service: EpIntersectionObserverStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpIntersectionObserverStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
