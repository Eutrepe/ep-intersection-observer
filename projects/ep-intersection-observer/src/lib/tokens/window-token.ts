import { InjectionToken } from '@angular/core';

export const INTERSECTION_OBSERVE_WINDOW = new InjectionToken<Window>('INTERSECTION_OBSERVE_WINDOW', {
  providedIn: 'root',
  factory: () => window,
});
