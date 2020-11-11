import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoEventComponent } from './io-event.component';

describe('IoEventComponent', () => {
  let component: IoEventComponent;
  let fixture: ComponentFixture<IoEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IoEventComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
