import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IoDefaultComponent } from './components/io-default/io-default.component';
import { IoEventAssetsComponent } from './components/io-event-assets/io-event-assets.component';
import { IoEventComponent } from './components/io-event/io-event.component';
import { IoMenuComponent } from './components/io-menu/io-menu.component';
import { RouterModule, Routes } from '@angular/router';

import { INTERSECTION_OBSERVE_GLOBAL_CONFIG } from './../../../ep-intersection-observer/src/lib/tokens/config-token';
import { EpIntersectionObserverModule } from './../../../ep-intersection-observer/src/lib/ep-intersection-observer.module';

const appRoutes: Routes = [
  {
    path: '',
    component: IoDefaultComponent,
  },
  {
    path: 'menu-example',
    component: IoMenuComponent,
  },
  {
    path: 'event-example',
    component: IoEventComponent,
  },
  {
    path: 'event-assets-example',
    component: IoEventAssetsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [IoDefaultComponent, IoEventAssetsComponent, IoEventComponent, IoMenuComponent],
  imports: [RouterModule.forRoot(appRoutes), CommonModule, EpIntersectionObserverModule],

  // ***** We use global configuration for all directives in this module.
  providers: [
    {
      provide: INTERSECTION_OBSERVE_GLOBAL_CONFIG,
      useValue: {
        intersectionConfig: {
          rootMargin: '-20% 0px -20% 0px',
        },
        epIoInvokeOnce: false,
      },
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
