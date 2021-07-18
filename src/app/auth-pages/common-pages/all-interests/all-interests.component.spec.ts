import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInterestsComponent } from './all-interests.component';

describe('AllInterestsComponent', () => {
  let component: AllInterestsComponent;
  let fixture: ComponentFixture<AllInterestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInterestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
