import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSessionComponent } from './customer-session.component';

describe('CustomerSessionComponent', () => {
  let component: CustomerSessionComponent;
  let fixture: ComponentFixture<CustomerSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
