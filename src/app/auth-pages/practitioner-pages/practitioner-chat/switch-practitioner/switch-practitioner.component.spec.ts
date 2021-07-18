import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchPractitionerComponent } from './switch-practitioner.component';

describe('SwitchPractitionerComponent', () => {
  let component: SwitchPractitionerComponent;
  let fixture: ComponentFixture<SwitchPractitionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchPractitionerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchPractitionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
