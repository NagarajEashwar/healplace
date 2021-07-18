import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCustomerPaymentComponent } from './add-new-customer-payment.component';

describe('AddNewCustomerPaymentComponent', () => {
  let component: AddNewCustomerPaymentComponent;
  let fixture: ComponentFixture<AddNewCustomerPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCustomerPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCustomerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
