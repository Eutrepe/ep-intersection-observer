import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoEventAssetsComponent } from './io-event-assets.component';

describe('IoEventAssetsComponent', () => {
  let component: IoEventAssetsComponent;
  let fixture: ComponentFixture<IoEventAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IoEventAssetsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoEventAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
