import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FirstPageComponent implements OnInit {
  userData: any;
  name:any = localStorage.getItem("nick_name");
  logedinData: any;
  constructor(
    public apiService : ApiService,
    public router : Router,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.logedinData = JSON.parse(localStorage.getItem("logedin_data"));
  }
  nameChange(){
    console.log(this.name);
    localStorage.setItem("nick_name", this.name);
  }
}