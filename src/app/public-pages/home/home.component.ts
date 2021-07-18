import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-public-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig,AuthService]
})
export class PublicHomeComponent implements OnInit {
  public _token: any;


  breadCrumbItems: Array<{}>;
  isCollapsed: boolean;
  practitionerProfileList: Array<any> = [];
  practitionerArticleList: Array<any> = [];
  currentUserDetails: any;
  homepageDynamicObj: any = {};

  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    config: NgbCarouselConfig
  ) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/customer/welcome-customer"]);
    }
  }
}
