import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-fourth-page',
  templateUrl: './fourth-page.component.html',
  styleUrls: ['./fourth-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FourthPageComponent implements OnInit {
  userData: any;
  notification_type:any = localStorage.getItem("notification_type");;
  reminder_type:any = localStorage.getItem("reminder_type");;
  logedinData: any;
  constructor(
    public apiService : ApiService,
    public router : Router,
    public toastr : ToastrService,
    public loader: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.logedinData = JSON.parse(localStorage.getItem("logedin_data"));
  }
  notificationChange(){
    console.log(this.notification_type);
    localStorage.setItem("notification_type", this.notification_type);
  }
  reminderChange(){
    console.log(this.reminder_type);
    localStorage.setItem("reminder_type", this.reminder_type);
  }
  submit(){
    let payload = this.logedinData;
    if(localStorage.getItem("nick_name")){
      payload["nick_name"] = localStorage.getItem("nick_name");
    }
    if(localStorage.getItem("interest")){
      payload["interest"] = JSON.parse(localStorage.getItem("interest"));
    }
    if(localStorage.getItem("is_news_subscribe")){
      payload["is_news_subscribe"] = localStorage.getItem("is_news_subscribe");
    }
    if(localStorage.getItem("is_sms_subscribe")){
      payload["is_sms_subscribe"] = localStorage.getItem("is_sms_subscribe");
    }
    if(localStorage.getItem("is_email_subscribe")){
      payload["is_email_subscribe"] = localStorage.getItem("is_email_subscribe");
    }
    if(localStorage.getItem("notification_type")){
      payload["notification_type"] = "Email";
    }
    if(localStorage.getItem("reminder_type")){
      payload["reminder_type"] = localStorage.getItem("reminder_type");
    }
    console.log(payload);
    //return;
    this.loader.show();
    this.apiService
    .updateBasicInfo(payload,payload["id"])
    .subscribe((response: any) => {
      console.log(response);
      this.toastr.success('Basic information updated successfully');
      this.loader.hide();
      this.loggedUpdate();
    });
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
  }
}