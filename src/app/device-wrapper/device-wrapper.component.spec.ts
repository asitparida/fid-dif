import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceWrapperComponent } from './device-wrapper.component';

describe('DeviceWrapperComponent', () => {
  let component: DeviceWrapperComponent;
  let fixture: ComponentFixture<DeviceWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
