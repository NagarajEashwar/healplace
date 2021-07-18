import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractionerSessionComponent } from './practioner-session.component';

describe('PractionerSessionComponent', () => {
  let component: PractionerSessionComponent;
  let fixture: ComponentFixture<PractionerSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractionerSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PractionerSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
