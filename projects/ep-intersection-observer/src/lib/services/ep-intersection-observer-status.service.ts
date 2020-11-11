import { IntersectionObserverEvent } from './../interfaces/intersection-observer-event';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpIntersectionObserverStatusService {
  private subject = new Subject<IntersectionObserverEvent>();

  constructor() {}

  public get(): Observable<IntersectionObserverEvent> {
    return this.subject.asObservable();
  }

  public send(status: IntersectionObserverEvent) {
    this.subject.next(status);
  }
}
