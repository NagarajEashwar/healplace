import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpFormComponent } from './follow-up-form.component';

describe('FollowUpFormComponent', () => {
  let component: FollowUpFormComponent;
  let fixture: ComponentFixture<FollowUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
