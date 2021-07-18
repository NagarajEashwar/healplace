import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-practioner-session',
  templateUrl: './practioner-session.component.html',
  styleUrls: ['./practioner-session.component.scss']
})
export class PractionerSessionComponent implements OnInit {

  @Input() resource: any;
  @Input() sessions: any;
  @Output() changeBack = new EventEmitter<any>();

  isContent: any;
  addSessionModel: any;
  confirmSessionModel: any;
  session: any;

  constructor(
    private http: HttpClient,
    public modalService: NgbModal,
    private loader: NgxSpinnerService,
  ) {}

  ngOnInit(): void {

  }

  openConfirmSessionModal(modalContent:any, isWhere:string, session:any) {
    this.changeBack.emit(true);
    this.isContent = isWhere;
    
    this.session = session;
    this.confirmSessionModel = this.modalService.open(modalContent, {windowClass: 'modal-holder add-session-modal'});
  }

  closeConfirmSessionModal(Event:any){
    this.confirmSessionModel.close();
  }
  openAddSessionModal(modalContent:any, isWhere:string, session:any) {
    this.confirmSessionModel.close();
    this.changeBack.emit(true);
    this.isContent = isWhere;
    this.session = session;
    this.addSessionModel = this.modalService.open(modalContent, {windowClass: 'modal-holder add-session-modal'});
  }

  closeAddSessionModal(Event:any){
    this.addSessionModel.close();
  }
}
