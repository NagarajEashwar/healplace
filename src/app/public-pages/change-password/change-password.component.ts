import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/ApiService';
import { AuthService } from 'src/app/services/AuthService';


@Component({
  selector: 'app-public-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class PublicChangePasswordComponent implements OnInit {

  changePassForm: FormGroup
  user = {
    password1: "",
    password2: "",
  };
  passwordError: any[];
  userId: string;
  userToken: string;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    public modalService: NgbModal,
    public toastr: ToastrService,
    private loader: NgxSpinnerService,
  ) { }

  ngOnInit() {
    console.log('change-password');
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/customer/welcome-customer"]);
    }
    let tempURL = this.route.snapshot.queryParamMap;
    tempURL.keys.forEach(element => {
      console.log(element)
      var parts = element.split("/");
      console.log(parts);
      this.userId = parts[6];
      this.userToken = parts[7];
    });
  }
  onlyCapitalLetters (str) { 
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i].match(/[A-Z]/)) {
        newStr += str[i];
      }
    }
    return newStr;
  }
  onlySmallLetters (str) { 
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i].match(/[a-z]/)) {
        newStr += str[i];
      }
    }
    return newStr;
  }
  onlySpecialChar (str) { 
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i].match(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/)) {
        newStr += str[i];
      }
    }
    return newStr;
  }
  onSubmit(){
    if (this.user) {
      this.passwordError = [];
      let passrrror = [];
      if(!/\d/.test(this.user.password1)){
        passrrror.push({
          error: "This password must contain at least 1 digit."
        });
      }
      if(this.onlyCapitalLetters(this.user.password1).length < 5){
        passrrror.push({
          error: "This password must contain at least 5 upper case letters."
        });
      }
      if(this.onlySmallLetters(this.user.password1).length < 4){
        passrrror.push({
          error: "This password must contain at least 4 lower case letters."
        });
      }
      if(this.onlySpecialChar(this.user.password1).length < 3){
        passrrror.push({
          error: "This password must contain at least 3 special characters."
        });
      }
      if(this.user.password1 != this.user.password2){
        passrrror.push({
          error: "The two password fields didn't match."
        });
      }
      console.log(passrrror);
      this.passwordError = passrrror;
      if(!passrrror.length){
        this.loader.show();
        let payload = {
          new_password1: this.user.password1,
          new_password2: this.user.password2,
          uid: this.userId,
          token: this.userToken,
        }
        console.log(payload);
        this.apiService
          .changeForgotResetPassword(payload,this.userId,this.userToken)
          .subscribe((response: any) => {
            console.log(response);
            if(response.email){
              this.toastr.warning(response.email);
            }else if(response.detail){
              this.toastr.success(response.detail)
            }
            this.loader.hide();
          },
          (errResponse: HttpErrorResponse) => {
            if(errResponse['error']['non_field_errors']){
              errResponse['error']['non_field_errors'].forEach(element => {
                this.toastr.error(element);
              });
            }else if(errResponse['error']['password1']){
              errResponse['error']['password1'].forEach(element => {
                this.toastr.error(element);
              });
            }else if(errResponse['error']['new_password2']){
              errResponse['error']['new_password2'].forEach(element => {
                this.toastr.error(element);
              });
            }else{
              this.toastr.error('Something went wrong please try again');
            }
            this.loader.hide();
          }
        );
      }
    }
  }
  password_visit1() {
    let x = document.getElementById("signup-password1") as HTMLInputElement;
    if (x.type == "password") {
      document.getElementById("eye-open1").className = "fa fa-lg fa-eye field-icon toggle-password view-hide";
      x.type = "text";
    } else {
      document.getElementById("eye-open1").className = "fa fa-lg fa-eye-slash field-icon toggle-password view-hide";
      x.type = "password";
    }
  }
  password_visit2() {
    let x = document.getElementById("signup-password2") as HTMLInputElement;
    if (x.type == "password") {
      document.getElementById("eye-open2").className = "fa fa-lg fa-eye field-icon toggle-password view-hide";
      x.type = "text";
    } else {
      document.getElementById("eye-open2").className = "fa fa-lg fa-eye-slash field-icon toggle-password view-hide";
      x.type = "password";
    }
  }
}