import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class AuthSidebarComponent implements OnInit {
  public _token: any;
  hideHeader: any = true;
  model: any;
  isContent: any;
  userData: any;
  isGroup: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    private modalService: NgbModal,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"]);
    }
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.isGroup = this.userData?.groups[0];
  }
  openModal(modalContent:any, isWhere:string) {
    this.isContent = isWhere;
    this.model = this.modalService.open(modalContent, {windowClass: 'modal-holder'});
  }
  closeModal(Event:any){
    this.model.close();
  }
  logout(){
    this.socialAuthService.signOut();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("logedin_data");
    window.location.reload();
  }
}