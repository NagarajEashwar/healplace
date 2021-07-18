import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ThirdPApiService } from '../../../services/ThirdPApiService';
import { ZoomMeetingConfig} from '../../../config/config';
import { ApiService } from 'src/app/services/ApiService';
import { GeneralService} from '../../../services/GeneralService';
import { AuthService } from '../../../services/AuthService';

@Component({
  selector: 'app-practitioner-dashboard',
  templateUrl: './practitioner-dashboard.component.html',
  styleUrls: ['./practitioner-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PractitionerDashboardComponent implements OnInit {

  appointmentId = '6c12b16c-10e4-40a1-bcce-06bfebef0055';

  constructor(
    public apiService : ApiService,
    public router: Router,
    public thirdPApiService: ThirdPApiService,
    public generalService: GeneralService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    console.log('Practitioner Dashboard');
    this.generalService.setTitle(null);
  }
  navigateToSessionPage() {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const isGroup = userData?.groups[0].toLowerCase();
    const userName = userData?.user.username;
    const email = userData?.user.email;
    this.thirdPApiService.getZoomMeetingList(this.appointmentId)
      .subscribe((response: any) => {
        console.log('response', response);
        window.open(`${ZoomMeetingConfig.ZOOM_SESSION_APP_URL}/?user=${userName}&id=${response[0].meeting_id}&auth=${this.auth.getToken()}&email=${email}&group=${isGroup}`, '_blank');
      }, (error) => {
        console.error(error);
      });
  }
  navigateToChatPage() {
    this.router.navigate(['chat'])
  }
}