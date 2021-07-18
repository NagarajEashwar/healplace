import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService';
import { Router } from '@angular/router';
import { ThirdPApiService } from '../../services/ThirdPApiService';
import { ZoomMeetingConfig } from '../../config/config';
import { AuthService } from '../../services/AuthService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

appointmentId = '0bf79474-b235-440d-ab81-991f5faf791f';

  constructor(
    public apiService: ApiService,
    private router: Router,
    public thirdPApiService: ThirdPApiService,
    public auth: AuthService,
    private loader: NgxSpinnerService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    console.log('Dashboard');
  }

  goToAddExpertise() {
    this.router.navigate(['/add-expertise']);
    window.scrollTo(0, 0)
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
        this.loader.hide();
        console.error(error);
      });
  }
  navigateToChatPage() {
    this.router.navigate(['chat']);
  }
}