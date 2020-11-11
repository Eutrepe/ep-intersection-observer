import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoMenuComponent } from './io-menu.component';

describe('IoMenuComponent', () => {
  let component: IoMenuComponent;
  let fixture: ComponentFixture<IoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IoMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
