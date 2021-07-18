import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-fifth-page',
  templateUrl: './fifth-page.component.html',
  styleUrls: ['./fifth-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FifthPageComponent implements OnInit {
  userData: any;
  moodsData: any;
  logedinData: any;

  constructor(
    public apiService : ApiService,
    public router : Router,
    public loader : NgxSpinnerService,
    public toastr : ToastrService,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.logedinData = JSON.parse(localStorage.getItem("logedin_data"));
    this.loadData();
  }
  loadData(){
    this.loader.show();
    this.apiService
    .getMoods(this.logedinData["id"])
    .subscribe((response: any) => {
      console.log(response);
      this.moodsData = response;
      this.loader.hide();
    });
  }
  chooseMe(obj:any, isMood:any){
    console.log(obj);
    let dummy = [1,2,3,4,5,6];
    let mekeIt = false;
    let i = 1;
    dummy.forEach(element => {
      let refContent = document.getElementById(`myid${i}`) as HTMLInputElement;
      if(refContent.className == "sd-container fix-shadow"){
        if(obj == i){
          mekeIt = false;
        }else{
          mekeIt = true;
        }
      }
      i++;
    });
    let refContent = document.getElementById(`myid${obj}`) as HTMLInputElement;
    if(!mekeIt){
      if(refContent.className == "sd-container fix-shadow"){
        refContent.className = "sd-container";
        localStorage.removeItem("mood");
      }else{
        refContent.className = "sd-container fix-shadow";
        localStorage.setItem("mood", isMood);
      }
    }
  }
  profileSubmit(){
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
    if(localStorage.getItem("mood")){
      payload["moods"] = [{
        "mood": localStorage.getItem("mood"),
        "created": new Date(),
      }];
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
      //this.submit();
    });
  }
  submit(){
    let payload = this.logedinData;
    if(localStorage.getItem("mood")){
      payload["moods"] = [{
        "mood": localStorage.getItem("mood"),
        "created": Date(),
      }];
    }
    console.log(payload);
    //return;
    this.loader.show();
    this.apiService
    .updateBasicInfo(payload,payload["user_id"])
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
    .previousLoggedUpdate(payload,this.userData["user"]["pk"])
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