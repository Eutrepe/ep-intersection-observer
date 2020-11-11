import { EpIntersectionObserverWatchService } from './../../../../../ep-intersection-observer/src/lib/services/ep-intersection-observer-watch.service';
import { INTERSECTION_OBSERVE_GLOBAL_CONFIG } from './../../../../../ep-intersection-observer/src/lib/tokens/config-token';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-io-event-assets',
  templateUrl: './io-event-assets.component.html',
  styleUrls: ['./io-event-assets.component.scss'],

  // ***** We use global configuration for all directives in this component.
  //       We want change status when sections will be in between 20% of screen top and 20% from bottom
  //       We also set `epIoWaitFor` to `event`. With this option directive will start after event.       *****
  providers: [
    {
      provide: INTERSECTION_OBSERVE_GLOBAL_CONFIG,
      useValue: {
        intersectionConfig: {
          rootMargin: '-20% 0px -20% 0px',
        },
        epIoWaitFor: 'event',
      },
    },
  ],
})
export class IoEventAssetsComponent implements OnInit {
  private assetsCounter = 0;
  private assetsLength = 0;

  constructor(private ngEpIOWatchService: EpIntersectionObserverWatchService) {}

  ngOnInit(): void {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');

    this.assetsLength = images.length;
    this.assetsCounter = 0;

    // ***** Now we want start directive after loading ALL images (inside directives and outside) *****
    if (this.assetsLength) {
      images.forEach((image: HTMLImageElement) => {
        if (image.complete) {
          this.incrementCounter();
        } else {
          image.addEventListener('load', this.incrementCounter.bind(this), false);
          image.addEventListener('error', this.incrementCounter.bind(this), false);
        }
      });
    } else {
      // ***** We send event with default group name: '' (empty string) *****
      this.ngEpIOWatchService.start();
    }
  }

  private incrementCounter(): void {
    this.assetsCounter++;
    if (this.assetsCounter === this.assetsLength) {
      // ***** We send event with default group name: '' (empty string) *****
      this.ngEpIOWatchService.start();
    }
  }
}
