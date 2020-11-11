import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoDefaultComponent } from './io-default.component';

describe('IoDefaultComponent', () => {
  let component: IoDefaultComponent;
  let fixture: ComponentFixture<IoDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IoDefaultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
