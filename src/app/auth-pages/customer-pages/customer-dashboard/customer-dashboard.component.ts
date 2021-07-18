import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/ApiService';
import { ThirdPApiService } from '../../../services/ThirdPApiService';
import { ZoomMeetingConfig } from '../../../config/config';
import { AuthService } from '../../../services/AuthService';
import { GeneralService } from '../../../services/GeneralService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerDashboardComponent implements OnInit {
  userData: any;
  chats: Array<Object> = [{}];
  interests: Array<Object> = [{}];
  name: string;
  customer: any = {};
  appointmentId = '0bf79474-b235-440d-ab81-991f5faf791f';

  constructor(
    public apiService: ApiService,
    public router: Router,
    public thirdPApiService: ThirdPApiService,
    public auth: AuthService,
    public generalService: GeneralService,
    private loader: NgxSpinnerService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    console.log('Customer Dashboard');
    this.generalService.setTitle(null);
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.name = this.userData?.user.first_name + ' ' + this.userData?.user.last_name;
    this.fetchDetails();
    this.fetchChats();
    this.fetchInterests();
    
  }
  fetchDetails() {
    this.apiService
      .getCustomerDetails()
      .subscribe((response: any) => {
        if (response) {
          this.customer = response.stats_value;
        }
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.loader.hide();
      });
  }
  fetchChats() {
    this.apiService
      .getCustomerChats()
      .subscribe((res: any) => {
        if (res) {
          this.chats = res.data.response;
        }
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.loader.hide();
      });
  }
  fetchInterests() {
    this.apiService
      .getIntrest()
      .subscribe((res: any) => {
        if (res) {
         this.interests = res;
        }
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.loader.hide();
      });
  }
  navigateToSessionPage() {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const isGroup = userData?.groups[0].toLowerCase();
    const userName = userData?.user.username;
    const email = userData?.user.email;
    this.loader.show();
    this.thirdPApiService.getZoomMeetingList(this.appointmentId)
      .subscribe((response: any) => {
        console.log('response', response);
        this.loader.hide();
        if(response && response.length >0){
          window.open(`${ZoomMeetingConfig.ZOOM_SESSION_APP_URL}/?user=${userName}&id=${response[0].meeting_id}&auth=${this.auth.getToken()}&email=${email}&group=${isGroup}`, '_blank');
        } else {
          this.toaster.error('No meetings id available');
        }
      }, (error) => {
        console.error(error);
        this.loader.hide();
      });
  }
  navigateToChatPage() {
    this.router.navigate(['chat'])
  }
}