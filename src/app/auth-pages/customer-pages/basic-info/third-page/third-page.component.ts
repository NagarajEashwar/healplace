import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThirdPageComponent implements OnInit {
  userData: any;
  is_news_subscribe:any = localStorage.getItem("is_news_subscribe");
  is_sms_subscribe:any = localStorage.getItem("is_sms_subscribe");
  is_email_subscribe:any = localStorage.getItem("is_email_subscribe");
  constructor(
    public apiService : ApiService,
    public router : Router,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
  }
  newsChange(){
    console.log(this.is_news_subscribe);
    localStorage.setItem("is_news_subscribe", this.is_news_subscribe);
  }
  smsChange(){
    console.log(this.is_sms_subscribe);
    localStorage.setItem("is_sms_subscribe", this.is_sms_subscribe);
  }
  emailChange(){
    console.log(this.is_email_subscribe);
    localStorage.setItem("is_email_subscribe", this.is_email_subscribe);
  }
}