import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  isEdit: boolean;
  bankDetails: any;
  constructor(public apiService: ApiService,
    private loader: NgxSpinnerService,
    public toastr: ToastrService,) { }

  ngOnInit(): void {
    this.loader.show();
    this.apiService
      .getBankAccount()
      .subscribe((response: any) => {
        this.isEdit = true;
        const data = response.results[0];
        this.bankDetails = response.results[0];
        this.addBankDetailsForm.setValue({
          routing_number: data.routing_number,
          account_holder_type: data.account_holder_type,
          account_number: data.account_number,
          account_holder_name: data.account_holder_name,
          bank_name: data.bank_name,
        });
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {

        this.loader.hide();
      });
  }

  addBankDetailsForm = new FormGroup({
    routing_number: new FormControl('', Validators.required),
    account_holder_type: new FormControl('', Validators.required),
    account_number: new FormControl('', Validators.required),
    account_holder_name: new FormControl('', Validators.required),
    bank_name: new FormControl('', Validators.required),
  })

  saveBankDetails() {
    this.loader.show();
    if (this.isEdit) {
      this.editBankDetails();
    } else {
      this.addBankDetails();
    }
  }

  addBankDetails() {
    const data = { ...this.addBankDetailsForm.value, ... { "practitioner": "ef2eb4b7-e27c-49af-bec0-c87bbe230fee", "is_default":true,
    "is_active": true } };
    this.apiService
      .addBankAccount(data)
      .subscribe((response: any) => {
        this.toastr.success('Bank account created successfully.');
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.toastr.error('Something went wrong.');
        this.loader.hide();
      });
  }

  editBankDetails() {
    const updatedFormValues = {};
    this.addBankDetailsForm['_forEachChild']((control, name) => {
     if (control.dirty) {
         updatedFormValues[name] = control.value;
     }
   });
    const data = { ...this.addBankDetailsForm.value, ... { "practitioner": "ef2eb4b7-e27c-49af-bec0-c87bbe230fee", "is_default":true, "is_active": true } };
    this.apiService
      .editBankAccount(data, this.bankDetails.id)
      .subscribe((response: any) => {
        this.toastr.success('Bank account updated successfully.');
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.toastr.error('Something went wrong.');
        this.loader.hide();
      });
  }

}
