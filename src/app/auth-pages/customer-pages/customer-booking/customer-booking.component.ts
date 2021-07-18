import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './ngbdmodalcontent.component'
import { ChooseSessionTypeModel } from './choose-session-type.model';

@Component({
  selector: 'app-customer-booking',
  templateUrl: './customer-booking.component.html',
  styleUrls: ['./customer-booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CustomerBookingComponent implements OnInit {
  closeResult: string;
  constructor(public apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    console.log('Customer booking');
    this.open();
  }

  open() {
    this.modalService.open(NgbdModalContent, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', size: 'lg', windowClass: 'customer-booking-modal' });
  }
}
