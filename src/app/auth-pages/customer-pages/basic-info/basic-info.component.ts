import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'customer-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  page: any = 1;
  logedinData: any;
  userData: any;

  constructor(
    public apiService: ApiService,
    private http: HttpClient,
    public loader : NgxSpinnerService,
    public toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.logedinData = JSON.parse(localStorage.getItem("logedin_data"));
  }
  slideUponMe(isPAGE:any){
    this.page = isPAGE;
  }
  loggedUpdate(){
    this.loader.show();
    let payload = {
      is_previously_logged_in: true
    }
    this.apiService
    .previousLoggedUpdate(payload,this.logedinData["id"])
    .subscribe((response: any) => {
      console.log(response);
      this.userData["is_previously_logged_in"] = true;
      localStorage.setItem(
        `user_data`,
        JSON.stringify(this.userData)
      );
      localStorage.setItem(
        `logedin_data`,
        JSON.stringify(response)
      );
      this.clearStore();
      this.loader.hide();
      window.location.reload();
    });
  }
  clearStore(){
    localStorage.removeItem("nick_name");
    localStorage.removeItem("interest");
    localStorage.removeItem("is_news_subscribe");
    localStorage.removeItem("is_sms_subscribe");
    localStorage.removeItem("is_email_subscribe");
    localStorage.removeItem("notification_type");
    localStorage.removeItem("reminder_type");
    localStorage.removeItem("mood");
  }
}
