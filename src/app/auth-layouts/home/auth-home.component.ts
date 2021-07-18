import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/ApiService';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.scss'],
})
export class AuthHomeComponent implements OnInit {
  userData: any;
  showCutomerInfo: boolean = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    public modalService: NgbModal,
    public toastr: ToastrService,
    private loader: NgxSpinnerService,
  ) {}

  ngOnInit() {
    console.log("Activated Modules");
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    if(this.userData["groups"][0] == "Customer" && this.userData["is_previously_logged_in"] == false){
      this.showCutomerInfo = false;
    }
  }
}
