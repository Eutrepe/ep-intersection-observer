import { INTERSECTION_OBSERVE_WINDOW } from './tokens/window-token';
import { NgModule } from '@angular/core';
import { EpIntersectionObserverDirective } from './directives/ep-intersection-observer.directive';

@NgModule({
  declarations: [EpIntersectionObserverDirective],
  imports: [],
  providers: [{ provide: INTERSECTION_OBSERVE_WINDOW, useValue: window }],
  exports: [EpIntersectionObserverDirective],
})
export class EpIntersectionObserverModule {}
