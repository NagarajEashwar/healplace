import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-block-customer',
  templateUrl: './block-customer.component.html',
  styleUrls: ['./block-customer.component.scss']
})
export class BlockCustomerComponent implements OnInit {
  option = null;
  currentStep = 'one';
  shortDescription;
  isEnableReportBtn = false;
  fileData;
  userData;
  reason = {
    'first': 'disrespectful',
    'second': 'something'
  };
  pid = '398ac134-372f-4309-85a3-363c711d52cb';
  cid = 'f0c1e8d6-0666-47f9-bf24-0f276a53a649';

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

  blockCustomer() {
    const formData = new FormData();
    formData.append("customer", this.cid);
    formData.append("practitioner", this.pid);
    formData.append("reason", this.reason[this.option]);
    formData.append("message", this.shortDescription);
    formData.append("screen_shot", this.fileData);
    this.loader.show();
    this.apiService.blockCustomer(formData)
      .subscribe((report: any) => {
        console.log('block customer', report);
        this.loader.hide();
        this.currentStep = 'three';
      }, (error) => {
        console.log('block customer error', error);
        this.loader.hide();
      });
  }

  backToPlatform() {
    this.activeModal.close();
    this.router.navigate(['welcome-customer']);
  }

}
