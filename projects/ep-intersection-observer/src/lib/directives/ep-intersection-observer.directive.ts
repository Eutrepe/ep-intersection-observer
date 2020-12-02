import { EpIntersectionObserverWatchService } from './../services/ep-intersection-observer-watch.service';
import { EpIntersectionObserverStatusService } from './../services/ep-intersection-observer-status.service';
import { INTERSECTION_OBSERVE_WINDOW } from './../tokens/window-token';
import { IntersectionObserveGlobalConfig } from './../types/intersection-observe-global-config';
import { INTERSECTION_OBSERVE_GLOBAL_CONFIG } from './../tokens/config-token';
import { IntersectionObserverEvent } from './../types/intersection-observer-event';
import { IntersectionObserveConfig } from './../types/intersection-observe-config';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

/** @dynamic */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ep-io]',
})
export class EpIntersectionObserverDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input('ep-io') public epIntersectionConfig: IntersectionObserveConfig = {};
  @Input() public epIoActiveClass = 'in-viewport';
  @Input() public epIoInvokeOnce = false;
  @Input() public epIoWaitFor = 'none';
  @Input() public epIoGroupName = '';
  @Input() public epIoRemoveClassAfterLeaving = true;
  @Input() public epIoOnActive: (...args: any[] | null) => void = null;
  @Input() public epIoOnUnactive: (...args: any[] | null) => void = null;
  // @Input() epIoOnActiveParams: Array<any> = [];
  // @Input() epIoOnUnactiveParams: Array<any> = [];

  @Output() epIoViewportChange: EventEmitter<IntersectionObserverEvent> = new EventEmitter();

  private settings: IntersectionObserveConfig = null;
  private observer: IntersectionObserver = null;
  private wasActivated = false;
  private isInViewport = false;

  private subscription: Subscription;
  private defaultConfig: IntersectionObserveConfig = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0.0],
  };

  private assetsLength: number;
  private assetsCounter: number;

  constructor(
    @Optional() @Inject(INTERSECTION_OBSERVE_GLOBAL_CONFIG) private globalConfig: IntersectionObserveGlobalConfig,
    @Inject(INTERSECTION_OBSERVE_WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private ngEpIOStatusService: EpIntersectionObserverStatusService,
    private ngEpIOSWatchService: EpIntersectionObserverWatchService
  ) {
    if (!this.window) {
      this.window = this.document.defaultView as Window;
    }

    this.edgePolyfill();
  }

  private edgePolyfill(): void {
    if (
      this.window &&
      'IntersectionObserver' in this.window &&
      'IntersectionObserverEntry' in this.window &&
      // tslint:disable-next-line: no-string-literal
      'intersectionRatio' in this.window['IntersectionObserverEntry']['prototype'] &&
      !('isIntersecting' in IntersectionObserverEntry.prototype)
    ) {
      // tslint:disable-next-line: no-string-literal
      Object.defineProperty(this.window['IntersectionObserverEntry']['prototype'], 'isIntersecting', {
        get(): boolean {
          return this.intersectionRatio > 0;
        },
      });
    }
  }

  ngOnInit(): void {
    this.settings = { ...this.defaultConfig, ...this.globalConfig.intersectionConfig, ...this.epIntersectionConfig };

    this.epIoOnActive = this.globalConfig.epIoOnActive ?? this.epIoOnActive;
    this.epIoOnUnactive = this.globalConfig.epIoOnUnactive ?? this.epIoOnUnactive;
    this.epIoInvokeOnce = this.globalConfig.epIoInvokeOnce ?? this.epIoInvokeOnce;
    this.epIoWaitFor = this.globalConfig.epIoWaitFor ?? this.epIoWaitFor;
    this.epIoActiveClass = this.globalConfig.epIoActiveClass ?? this.epIoActiveClass;
    this.epIoGroupName = this.globalConfig.epIoGroupName ?? this.epIoGroupName;
    this.epIoRemoveClassAfterLeaving =
      this.globalConfig.epIoRemoveClassAfterLeaving ?? this.epIoRemoveClassAfterLeaving;
  }

  ngAfterViewInit(): void {
    switch (this.epIoWaitFor.toLocaleLowerCase()) {
      case 'event': {
        this.subscription = this.ngEpIOSWatchService.read().subscribe((groupName: string) => {
          if (groupName === this.epIoGroupName) {
            this.initObserver();
          }
        });
        break;
      }

      case 'media': {
        this.checkMedia();
        break;
      }

      case 'none': {
        this.initObserver();
        break;
      }

      default: {
        this.initObserver();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.unobserve(this.el.nativeElement);
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver((entries: Array<IntersectionObserverEntry>) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          if (this.epIoOnActive && typeof this.epIoOnActive === 'function') {
            this.epIoOnActive();
          }

          entry.target.classList.add(this.epIoActiveClass);

          this.wasActivated = true;
          this.isInViewport = true;
          this.epIoViewportChange.emit({
            el: this.el.nativeElement,
            status: this.isInViewport,
          });

          this.ngEpIOStatusService.send({
            el: this.el.nativeElement,
            status: this.isInViewport,
          });

          if (this.epIoInvokeOnce && entry.target.classList.contains(this.epIoActiveClass) && this.observer) {
            this.observer.unobserve(this.el.nativeElement);
          }
        } else {
          this.isInViewport = false;
          this.epIoViewportChange.emit({
            el: this.el.nativeElement,
            status: this.isInViewport,
          });

          this.ngEpIOStatusService.send({
            el: this.el.nativeElement,
            status: this.isInViewport,
          });

          if (this.epIoRemoveClassAfterLeaving) {
            entry.target.classList.remove(this.epIoActiveClass);
          }

          if (this.wasActivated && this.epIoOnUnactive && typeof this.epIoOnUnactive === 'function') {
            this.epIoOnUnactive();
          }
        }
      });
    }, this.settings);

    this.observer.observe(this.el.nativeElement);
  }

  private incrementAssetsCounter(): void {
    this.assetsCounter++;
    if (this.assetsCounter === this.assetsLength) {
      this.initObserver();
    }
  }

  private checkMedia(): void {}
}
