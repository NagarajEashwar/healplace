import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerSessionsComponent } from './practitioner-sessions.component';

describe('PractitionerSessionsComponent', () => {
  let component: PractitionerSessionsComponent;
  let fixture: ComponentFixture<PractitionerSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionerSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
