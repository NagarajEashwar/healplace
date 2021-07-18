import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report-practitioner',
  templateUrl: './report-practitioner.component.html',
  styleUrls: ['./report-practitioner.component.scss']
})
export class ReportPractitionerComponent implements OnInit {
  option = null;
  currentStep = 'one';
  shortDescription;
  isEnableReportBtn = false;
  fileData;
  reason = {
    'first': "Practitioner wasn't a good match",
    'second': 'Something else'
  };
  constructor(
    public apiService: ApiService,
    private loader: NgxSpinnerService,
    public toastr: ToastrService,
    public router: Router,
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
  }
  optionSelected(option) {
    this.option = option;
  }
  addDetails() {
    this.currentStep = 'two';
  }
  closeModal() {
    this.activeModal.close();
  }

  onFileSelected(event) {
    let file = event.target.files[0];
    this.fileData = file;
  }

  onShortDescription(val) {
    if (val) {
      this.isEnableReportBtn = true;
    } else {
      this.isEnableReportBtn = false;
    }
  }

  reportPractitioner() {
      const formData = new FormData();
      formData.append("practitioner", '85532b31-9544-449e-8baa-ccfde021c300');
      formData.append("reason", this.reason[this.option]);
      formData.append("reason_description", this.shortDescription);
      formData.append("screen_shot", this.fileData);
    this.loader.show();
    this.apiService.reportPractitioner(formData)
    .subscribe((report:any)=>{
      console.log('report', report);
      this.loader.hide();
      this.currentStep = 'three';
    }, (error)=>{
      console.log('report error', error);
      this.loader.hide();
    });
  }

  backToPlatform() {
    this.activeModal.close();
    this.router.navigate(['welcome-customer']);
  }

}
