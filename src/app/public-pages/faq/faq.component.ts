import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-public-faq-page',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [AuthService]
})
export class PublicFaqComponent implements OnInit {
  public _token: any;
  breadCrumbItems: Array<{}>;
  isCollapsed: boolean;
  faqList:Array<{}>;
  selectedItem : boolean = true;
  clickedItem : boolean = true;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/customer/welcome-customer"]);
    }
  }


  
  CustomerClick() {
    this.selectedItem = true;
    console.log("Customer");


  }
  PractitionerClick() {
    this.selectedItem = false;
    console.log("Customer");


  }
  collapseIcon(event) {
    if(event.currentTarget.className.indexOf("fas fa-arrow-down") > -1) {
      event.currentTarget.className = "fas fa-arrow-up";
    }
    else if(event.currentTarget.className.indexOf("fas fa-arrow-up") > -1) {
      event.currentTarget.className = "fas fa-arrow-down"
    }
  }

}
