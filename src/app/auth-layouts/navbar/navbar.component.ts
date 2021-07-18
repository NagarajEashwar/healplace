import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from '../../services/GeneralService';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})
export class AuthNavbarComponent implements OnInit {
  public _token: any;
  hideHeader: any = true;
  model: any;
  isContent: any;
  configData: any;
  userData: any;
  isGroup: any;
  title: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    private modalService: NgbModal,
    public generalService: GeneralService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"]);
    }
    this.router.events.subscribe((data) => {
      this.router.events.subscribe(data => {
        if (data instanceof ActivationStart) {
          this.title = data.snapshot.data.title;
        }
      });
    });
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.isGroup = this.userData?.groups[0];
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };
  }
  getTitle(){
    return this.generalService.title ? this.generalService.title : this.isGroup == 'Practitioner' ?  'Hi Dr. ' + this.transform(this.userData?.user?.first_name) : `Hi ` + this.transform(this.userData?.user?.first_name) + '!';
  }
  transform(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }
}
