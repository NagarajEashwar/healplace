import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../services/ApiService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-customer-payment',
  templateUrl: './add-new-customer-payment.component.html',
  styleUrls: ['./add-new-customer-payment.component.scss']
})
export class AddNewCustomerPaymentComponent implements OnInit {

  paymentForm: FormGroup;
  month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  year = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  selectedYear = 'Year';
  selectedMonth = 'Month';
  formSubmitted = false;
  @Input() isShowBackButton: boolean;
  @Input() buttonText: string;
  @Output() saveCardDetails = new EventEmitter<any>();
  @Output() goBack = new EventEmitter<any>();

  constructor(public apiService: ApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      fullName: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      billingAddr: ['', Validators.required],
      cardNumPart1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cardNumPart2: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cardNumPart3: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cardNumPart4: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      cvvNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }
  onGoBackBtnClick() {
    this.goBack.emit(true);
  }
  addNewPaymentDetails(paymentDetails) {
    console.log('paymentDetails', paymentDetails)
    this.formSubmitted = true;
    if (this.paymentForm.valid && this.selectedMonth !== 'Month' && this.selectedYear !== 'Year') {
      const payload = {
        "cc_number": paymentDetails.value.cardNumPart1 + paymentDetails.value.cardNumPart2 + paymentDetails.value.cardNumPart3 + paymentDetails.value.cardNumPart4,
        "cc_expiry": this.selectedMonth + '/' + this.selectedYear,
        "is_default": false,
        "account_holder_name": paymentDetails.value.fullName,
        "account_holder_type": null,
        "routing_number": null,
        "account_number": null,
        "customer": "f0c1e8d6-0666-47f9-bf24-0f276a53a649",
        "payment_methods": "90f274cf-0eaf-422e-97ef-0a641ab310f0"
      };
      this.saveCardDetails.emit(payload);
    }
  }

}
