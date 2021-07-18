import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SecondPageComponent implements OnInit {
  userData: any;
  interestData = [];
  logedinData: any;
  interest:any = [];
  constructor(
    public apiService : ApiService,
    public router : Router,
    public loader: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.logedinData = JSON.parse(localStorage.getItem("logedin_data"));
    this.interestData = this.logedinData["interest"]; 
    this.loadData();
  }
  loadData(){
    this.loader.show();
    this.apiService
    .getIntrest()
    .subscribe((response: any) => {
      console.log(response);
      this.interestData = response;
      this.loader.hide();
    });
  }
  chooseMe(intrestID:any){
    let refContent = document.getElementById(`${intrestID}`) as HTMLInputElement;
    if(refContent.className == "col-md-8 color-fix fix-shadow"){
      refContent.className = "col-md-8 color-fix";
      if(this.interest.find(obj=>obj == intrestID)){
        let removed = this.interest.filter(obj=>obj !=intrestID);
        this.interest = removed;
      }
      localStorage.removeItem("interest");
      localStorage.setItem("interest", JSON.stringify(this.interest));
    }else{
      refContent.className = "col-md-8 color-fix fix-shadow";
      if(this.interest.length){
        if(!this.interest.find(obj=>obj == intrestID)){
          this.interest.push(intrestID);
        }
      }else{
        this.interest.push(intrestID);
      }
      localStorage.removeItem("interest");
      localStorage.setItem("interest", JSON.stringify(this.interest));
    }
  }
}