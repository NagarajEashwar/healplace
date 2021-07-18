import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GeneralService } from 'src/app/services/GeneralService';

@Component({
  selector: 'public-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  providers: [AuthService]
})
export class LoginModalComponent implements OnInit {
  @Input() resource: any;
  @Output() changeBack = new EventEmitter<any>();
  public _accesstoken: any;
  public _refreshtoken: any;
  isContent: any;
  forgotModel: any;
  signupModel: any;
  fieldTextType: boolean;

  loginForm: FormGroup;
  submitted = false;
  user = {
    email: "",
    password: "",
    remember: false,
  };
  invalid_email:any
  email_required:any;
  socialUser: SocialUser;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    public modalService: NgbModal,
    public toastr: ToastrService,
    private loader: NgxSpinnerService,
    private socialAuthService: SocialAuthService,
    public generalService: GeneralService,
  ) {}

  setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
   }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/customer/welcome-customer"]);
    }
    if(localStorage.getItem("is_remember") == "true"){
      let rememberData = JSON.parse(localStorage.getItem("remember_data"));
      this.user = {
        email: rememberData.email,
        password: rememberData.password,
        remember: true,
      };
    }
    this.socialAuthService.authState.subscribe((socialuser) => {
      this.socialUser = socialuser;
      //console.log(socialuser);
    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  validateEmail(email) {
    let patternRe =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(patternRe.test(email.target.value)){
      this.invalid_email = false;
      this.email_required = false;
    }else{
      this.invalid_email = true;
      this.email_required = false;
      if(email.target.value == ''){
        this.email_required = true
        this.invalid_email = false
      }
    }
  }
  signInWithGoogle(): void {
    this.socialAuthService
    .signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(getUser => {
      if(getUser){
        console.log(getUser);
        this.sociaLogin(getUser, "google");
      }
    });
  }
  signInWithFB(): void {
    this.socialAuthService
    .signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(getUser => {
      console.log(getUser);
      if(getUser){
        this.sociaLogin(getUser, "facebook");
      }
    });
  }
  sociaLogin(User, isUser){
    this.loader.show();
    let payload;
    console.log(User)
    if(isUser == "google"){
      payload = {
        access_token:	User.access_token ? User.access_token : User.authToken,
        code:	User.first_issued_at ? User.first_issued_at : User.id,
        id_token:	User.id_token ? User.id_token : User.idToken,
      }
    }else{
      payload = {
        access_token:	User.authToken,
        code:	User.id,
        id_token:	User.id,
      }
    }
    console.log(payload);
    this.apiService
    .sociaLogin(payload,isUser)
    .subscribe((response: any) => {
      // console.log(response);
      if(response){
        this._accesstoken = response.access_token;
        this._refreshtoken = response.access_token;
        localStorage.setItem(
          "access_token",
          response.access_token
        );
        this.setCookie('access_token','test',7);
        localStorage.setItem(
          "refresh_token",
          response.refresh_token
        );
        delete response.access_token;
        delete response.refresh_token;
        localStorage.setItem(
          "user_data",
          JSON.stringify(response)
        );
        if(this.user.remember){
          localStorage.setItem("is_remember", "true");
          const remember = {
            email: this.user.email,
            password: this.user.password,
          };
          localStorage.setItem("remember_data", JSON.stringify(remember));
        }else{
          localStorage.setItem("is_remember", "false");
        }
        this.loader.hide();
        this.changeBack.emit(true);
        this.PKCallInit(response.groups[0].toLowerCase(),"get");
        // this.toastr.success('Login Successfully');
        // if(response.is_user_object_created == false){
        //   this.loggedUpdate({
        //     is_user_object_created: true
        //   });
        //   this.PKCallInit(response.groups[0].toLowerCase(),"post");
        // }else{
        //   this.loggedUpdate({
        //     is_previously_logged_in: true
        //   });
        //   this.PKCallInit(response.groups[0].toLowerCase(),"get");
        // }
        //window.location.reload();
        // if(response["groups"][0]){
        //   let routeName = this.generalService.routeName(response["groups"][0]);
        //   this.router.navigate([routeName]);
        // }
      }
    },
    (errResponse: HttpErrorResponse) => {
      if(errResponse['error']['non_field_errors']){
        errResponse['error']['non_field_errors'].forEach(element => {
          this.toastr.error(element);
        });
      }else{
        this.toastr.error('Something went wrong please try again');
      }
      this.loader.hide();
    }
  );
  }
  onSubmit(){
    if (this.user) {
      this.loader.show();
      let payload = {
        username: "",
        email: this.user.email,
        password: this.user.password,
        // phone_number: "",
      }
      console.log(payload);
      this.apiService
        .login(payload)
        .subscribe((response: any) => {
          console.log(response);
          if(response){
            this._accesstoken = response.access_token;
            this._refreshtoken = response.access_token;
            localStorage.setItem(
              "access_token",
              response.access_token
            );
            localStorage.setItem(
              "refresh_token",
              response.refresh_token
            );
            delete response.access_token;
            delete response.refresh_token;
            localStorage.setItem(
              "user_data",
              JSON.stringify(response)
            );
            if(this.user.remember){
              localStorage.setItem("is_remember", "true");
              const remember = {
                email: this.user.email,
                password: this.user.password,
              };
              localStorage.setItem("remember_data", JSON.stringify(remember));
            }else{
              localStorage.setItem("is_remember", "false");
            }
            this.loader.hide();
            this.changeBack.emit(true);
            // if(response.is_previously_logged_in == false){
            //   this.loggedUpdate({
            //     is_user_object_created: true
            //   });
            //   this.PKCallInit(response.groups[0].toLowerCase(),"get");
            // }else{
            //   this.PKCallInit(response.groups[0].toLowerCase(),"get");
            // }
            this.PKCallInit(response.groups[0].toLowerCase(),"get");
            // window.location.reload();
            // if(response["groups"][0]){
            //   let routeName = this.generalService.routeName(response["groups"][0]);
            //   this.router.navigate([routeName]);
            // }
          }
        },
        (errResponse: HttpErrorResponse) => {
          if(errResponse['error']['non_field_errors']){
            errResponse['error']['non_field_errors'].forEach(element => {
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
  loggedUpdate(payload){
    this.loader.show();
    let userData = JSON.parse(localStorage.getItem("user_data"));
    this.loader.show();
    this.apiService
    .previousLoggedUpdate(payload, userData["user"]["pk"])
    .subscribe((response: any) => {
      console.log(response);
      userData["is_previously_logged_in"] = true;
      localStorage.setItem(
        `user_data`,
        JSON.stringify(userData)
      );
      localStorage.setItem(
        `logedin_data`,
        JSON.stringify(response)
      );
      this.loader.hide();
    });
  }
  PKCallInit(group, method){
    this.loader.show();
    this.apiService
    .pkIdUpdate(group,method)
    .subscribe((response: any) => {
      console.log(response);
      localStorage.setItem(
        `logedin_data`,
        JSON.stringify(response[0] ? response[0] : response["results"][0])
      );
      this.toastr.success('Login Successfully');
      this.loader.hide();
      window.location.reload();
    });
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }
  //Popup Modals
  closeLoginModal(Event:any){
    this.changeBack.emit(true);
  }
  openSignupModal(modalContent:any, isWhere:string) {
    this.changeBack.emit(true);
    this.isContent = isWhere;
    this.signupModel = this.modalService.open(modalContent, {windowClass: 'modal-holder'});
  }
  openForgotModal(modalContent:any, isWhere:string) {
    this.changeBack.emit(true);
    this.isContent = isWhere;
    this.forgotModel = this.modalService.open(modalContent, {windowClass: 'modal-holder'});
  }
  closeSignupModal(Event:any){
    this.signupModel.close();
  }
  closeForgotModal(Event:any){
    this.forgotModel.close();
  }
}