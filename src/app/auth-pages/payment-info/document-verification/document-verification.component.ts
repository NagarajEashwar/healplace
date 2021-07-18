import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {

  constructor(public apiService: ApiService,
    private loader: NgxSpinnerService,
    public toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  documentVerificationDetailsForm = new FormGroup({
    file: new FormControl('', Validators.required),
    fileSource: new FormControl('', [Validators.required])
  })

  saveBankDetails() {
    this.addDocumentVerificationDetails();
  }

  addDocumentVerificationDetails() {
    const formData = new FormData();;
    const connect_id = "acct_1J8i8C2Zw2nwBsBW";
    formData.append('connect_id', connect_id);
    formData.append('file', this.documentVerificationDetailsForm.get('fileSource').value);

    this.apiService
      .addDocumentVerification(formData)
      .subscribe((response: any) => {
        this.apiService.acceptTerms(connect_id).subscribe((response: any) => {
          this.toastr.success('Document uploaded Successfully');
          this.loader.hide();
        },
        (errResponse: HttpErrorResponse) => {
          this.toastr.error('Something went wrong');
          this.loader.hide();
        });
      },
      (errResponse: HttpErrorResponse) => {
        this.loader.hide();
      });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentVerificationDetailsForm.patchValue({
        fileSource: file
      });
    }
  }

}
