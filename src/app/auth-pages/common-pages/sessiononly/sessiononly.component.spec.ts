import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessiononlyComponent } from './sessiononly.component';

describe('SessiononlyComponent', () => {
  let component: SessiononlyComponent;
  let fixture: ComponentFixture<SessiononlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessiononlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessiononlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
