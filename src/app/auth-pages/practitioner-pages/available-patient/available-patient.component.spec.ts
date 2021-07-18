import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePatientComponent } from './available-patient.component';

describe('AvailablePatientComponent', () => {
  let component: AvailablePatientComponent;
  let fixture: ComponentFixture<AvailablePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
