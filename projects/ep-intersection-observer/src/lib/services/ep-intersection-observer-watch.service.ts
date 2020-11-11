import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpIntersectionObserverWatchService {
  private subject = new Subject<string>();

  constructor() {}

  public read(): Observable<string> {
    return this.subject.asObservable();
  }

  public start(groupName: string = '') {
    this.subject.next(groupName);
  }
}
