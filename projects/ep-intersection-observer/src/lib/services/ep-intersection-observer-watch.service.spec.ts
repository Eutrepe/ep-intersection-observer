import { TestBed } from '@angular/core/testing';

import { EpIntersectionObserverWatchService } from './ep-intersection-observer-watch.service';

describe('EpIntersectionObserverWatchService', () => {
  let service: EpIntersectionObserverWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpIntersectionObserverWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
