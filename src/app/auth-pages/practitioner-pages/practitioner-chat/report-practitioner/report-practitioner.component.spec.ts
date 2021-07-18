import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPractitionerComponent } from './report-practitioner.component';

describe('ReportPractitionerComponent', () => {
  let component: ReportPractitionerComponent;
  let fixture: ComponentFixture<ReportPractitionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPractitionerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPractitionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
