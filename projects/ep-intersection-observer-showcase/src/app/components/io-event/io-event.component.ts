import { IntersectionObserverEvent } from './../../../../../ep-intersection-observer/src/lib/types/intersection-observer-event';
import { EpIntersectionObserverWatchService } from './../../../../../ep-intersection-observer/src/lib/services/ep-intersection-observer-watch.service';
import { EpIntersectionObserverStatusService } from './../../../../../ep-intersection-observer/src/lib/services/ep-intersection-observer-status.service';
import { INTERSECTION_OBSERVE_GLOBAL_CONFIG } from './../../../../../ep-intersection-observer/src/lib/tokens/config-token';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-io-event',
  templateUrl: './io-event.component.html',
  styleUrls: ['./io-event.component.scss'],

  // ***** We use global configuration for all directives in this component.
  //       We want change status when sections will be in between 20% of screen top and 20% from bottom
  //       We also set `epIoWaitFor` to `event`. With this option directive will start after event.
  //       We set  `epIoGroupName` if we want use more than one group. (Her we use just one so this property is not necessary :))  *****
  providers: [
    {
      provide: INTERSECTION_OBSERVE_GLOBAL_CONFIG,
      useValue: {
        intersectionConfig: {
          rootMargin: '-20% 0px -20% 0px',
        },
        epIoGroupName: 'myGroupName',
        epIoWaitFor: 'event',
      },
    },
  ],
})
export class IoEventComponent implements OnInit {
  constructor(
    private ngEpIOWatchService: EpIntersectionObserverWatchService,
    private ngEpIOStatusService: EpIntersectionObserverStatusService
  ) {}

  ngOnInit(): void {
    // ***** Intersection Observer will start work after 5 sec. *****
    setTimeout(() => {
      this.ngEpIOWatchService.start('myGroupName');
    }, 5000);

    this.ngEpIOStatusService.get().subscribe((event: IntersectionObserverEvent) => {
      console.log(event.el);
      console.log(event.status);
    });
  }
}
