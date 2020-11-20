import { InjectionToken } from '@angular/core';
import { IntersectionObserveGlobalConfig } from '../types/intersection-observe-global-config';

export const INTERSECTION_OBSERVE_GLOBAL_CONFIG = new InjectionToken<IntersectionObserveGlobalConfig>(
  'INTERSECTION_OBSERVE_GLOBAL_CONFIG'
);
