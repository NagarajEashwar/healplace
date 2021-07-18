import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/AuthService';
import { ApiService } from '../../../../services/ApiService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../../../../services/GeneralService';
import { CommonService } from '../../../../services/CommonService';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {
  @Input() resource: any;
  @Input() title: string;
  @Input() buttonText: string;
  @Input() type: string;
  @Input() editSession: any;
  @Input() session: any;
  @Output() changeBack = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();
  @Output() reloadSessions = new EventEmitter<any>();

  isContent: any;
  confirmSessionModel: any;
  expertises: any;

  addSessionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    duration_min: new FormControl(),
    expertise: new FormControl(),
    price: new FormControl(),
  })

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public apiService: ApiService,
    public modalService: NgbModal,
    private loader: NgxSpinnerService,
    public generalService: GeneralService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    if (this.editSession) {
      this.addSessionForm.setValue({
        title: this.session.title,
        duration_min: this.session.duration_min,
        expertise: this.session.expertise || '',
        price: this.session.price,
      });
    }
    this.loader.show();
    this.apiService.getExpertise().subscribe((response: any) => {
      this. expertises = response.results;
      this.loader.hide();
    },
      (errResponse: HttpErrorResponse) => {

        this.loader.hide();
      }
    );
  }

  openConfirmSessionModal(modalContent: any, isWhere: string, session: any) {
    this.changeBack.emit(true);
    this.isContent = isWhere;
    const updatedSession = this.addSessionForm.value;
    this.session = { ...session, ...updatedSession };
    this.confirmSessionModel = this.modalService.open(modalContent, { windowClass: 'modal-holder add-session-modal' });
  }

  closeConfirmSessionModal(Event: any) {
    this.confirmSessionModel.close();
  }
  back() {
    this.closeModal.emit(true);
  }
  saveSession(session: any) {
    this.loader.show();
    let userData = JSON.parse(localStorage.getItem("user_data"));
    let practitionerId = 'ef2eb4b7-e27c-49af-bec0-c87bbe230fee';

    const data = { ...session, ... { "practitioner": practitionerId } }
    let api;
    if (this.editSession) {
      api = this.apiService
        .editPractitionerSession(data, this.editSession.id);
    } else {
      api = this.apiService
        .addPractitionerSession(data);
    }

    api.subscribe((response: any) => {
      this.commonService.sendUpdate('reload');
      this.confirmSessionModel.close();
      this.loader.hide();
    },
      (errResponse: HttpErrorResponse) => {
        this.reloadSessions.emit(true);
        this.confirmSessionModel.close();
        this.loader.hide();
      }
    );
  }
}
