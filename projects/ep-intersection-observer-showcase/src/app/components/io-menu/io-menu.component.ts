import { IntersectionObserverEvent } from './../../../../../ep-intersection-observer/src/lib/types/intersection-observer-event';
import { INTERSECTION_OBSERVE_GLOBAL_CONFIG } from './../../../../../ep-intersection-observer/src/lib/tokens/config-token';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-io-menu',
  templateUrl: './io-menu.component.html',
  styleUrls: ['./io-menu.component.scss'],

  // ***** We use global configuration for all directives in this component.
  //       We want change status when sections will be in middle of screen   *****
  providers: [
    {
      provide: INTERSECTION_OBSERVE_GLOBAL_CONFIG,
      useValue: {
        intersectionConfig: {
          rootMargin: '-50% 0px -50% 0px',
        },
      },
    },
  ],
})
export class IoMenuComponent {
  // ***** menu item references *****
  @ViewChildren('menuItemRef') public menuItemsRef: QueryList<ElementRef>;

  constructor() {}

  // ***** If section status will change we find navigation link linked to this
  //       section and add `is-active` class, for others we remove this class    *****
  public onSectionChange(event: IntersectionObserverEvent): void {
    if (event.status) {
      const sectionId = event.el.getAttribute('id');

      this.menuItemsRef.forEach((item: ElementRef<HTMLLinkElement>) => {
        const linkHrefId = item.nativeElement.getAttribute('href').substr(1);

        if (linkHrefId === sectionId) {
          item.nativeElement.classList.add('is-active');
        } else {
          item.nativeElement.classList.remove('is-active');
        }
      });
    }
  }

  public onClick(event: Event): void {
    event.preventDefault();

    const target: any = event.target;
    const targetedSectionId: string = target.getAttribute('href').substr(1);
    const targetedSection: HTMLElement = document.getElementById(targetedSectionId);

    targetedSection.scrollIntoView({ behavior: 'smooth' });
  }
}
