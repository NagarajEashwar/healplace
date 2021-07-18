import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-switch-practitioner',
  templateUrl: './switch-practitioner.component.html',
  styleUrls: ['./switch-practitioner.component.scss']
})
export class SwitchPractitionerComponent implements OnInit {

  option = null;
  currentStep = 'one';
  shortDescription;
  isEnableReportBtn = false;
  fileData;
  userData;
  reason = {
    'first': "Practitioner wasn't a good match",
    'second': 'Something else'
  };
  pid = '398ac134-372f-4309-85a3-363c711d52cb';
  cid = 'f0c1e8d6-0666-47f9-bf24-0f276a53a649';
  chatSessionId = '104fd0c3-2e57-41d0-ae10-2294b6e90e8b';

  constructor(
    public apiService: ApiService,
    private loader: NgxSpinnerService,
    public toastr: ToastrService,
    public router: Router,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
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

  switchPractitioner() {
    const payload = {
      'practitioner_id': this.pid,
      'switch_reason': this.reason[this.option],
      'customer': this.cid,
      'chat_session': this.chatSessionId
    };
    this.loader.show();
    this.apiService.switchPractitioner(payload)
      .subscribe((report: any) => {
        console.log('block customer', report);
        this.loader.hide();
        this.toastr.success('Practitioner Switched successfully');
        this.activeModal.close();
        this.router.navigate(['welcome-customer']);
      }, (error) => {
        console.log('block customer error', error);
        this.loader.hide();
        if(error.error.message && error.error.message[0] === 'A customer can switch for 5 practitioners'){
          this.currentStep = 'three';
        }
      });
  }

  contactUs() {
    this.activeModal.close();
    this.router.navigate(['homepage/contact-us']);
  }


}
