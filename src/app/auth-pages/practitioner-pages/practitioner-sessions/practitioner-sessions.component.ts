import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/AuthService';
import { ApiService } from '../../../services/ApiService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../../../services/GeneralService';
import { CommonService } from '../../../services/CommonService';


@Component({
  selector: 'app-practitioner-sessions',
  templateUrl: './practitioner-sessions.component.html',
  styleUrls: ['./practitioner-sessions.component.scss']
})
export class PractitionerSessionsComponent implements OnInit {

  @Input() resource: any;
  @Output() changeBack = new EventEmitter<any>();
  username: string;
  isContent: any;
  addSessionModel: any;
  sessions: any = [];
  reload: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public apiService: ApiService,
    public modalService: NgbModal,
    private loader: NgxSpinnerService,
    public generalService: GeneralService,
    public commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.loader.show();
    this.fetchSessions();
    let userData = JSON.parse(localStorage.getItem("user_data"));
    this.username = userData?.user.first_name + ' ' + userData?.user.last_name;
    this.reload = this.commonService.getUpdate().subscribe
      (message => {
        this.ngOnInit();
      });
  }

  ngOnDestroy() {
    this.reload.unsubscribe();
  }

  fetchSessions() {
    this.apiService
      .getPractitionerSessions()
      .subscribe((response: any) => {
        if (response) {
          this.sessions = response.results;
        }
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.loader.hide();
      });
  }

  openAddSessionModal(modalContent: any, isWhere: string) {
    this.changeBack.emit(true);
    this.isContent = isWhere;
    this.addSessionModel = this.modalService.open(modalContent, { windowClass: 'modal-holder add-session-modal' });
  }

  closeAddSessionModal(Event: any) {
    console.log('sdsdds')
    this.addSessionModel.close();
  }

}
