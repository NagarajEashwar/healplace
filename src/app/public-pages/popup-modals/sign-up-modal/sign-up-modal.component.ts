  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { Router, ActivatedRoute } from '@angular/router';
  import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
  import { FormGroup } from '@angular/forms';
  import { AuthService } from 'src/app/services/AuthService';
  import { ApiService } from 'src/app/services/ApiService';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { ToastrService } from 'ngx-toastr';
  import { NgxSpinnerService } from 'ngx-spinner';
  import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
  import { ThirdPApiService } from 'src/app/services/ThirdPApiService';
  import { SocialAuthService } from 'angularx-social-login';
  import { SocialUser } from 'angularx-social-login';
  import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GeneralService } from 'src/app/services/GeneralService';

  @Component({
    selector: 'public-sign-up-modal',
    templateUrl: './sign-up-modal.component.html',
    styleUrls: ['./sign-up-modal.component.scss'],
    providers: [AuthService]
  })
  export class SignupModalComponent implements OnInit {
    @Input() resource: any;
    @Output() changeBack = new EventEmitter<any>();

    public _token: any;
    fieldTextType1: boolean;
    fieldTextType2: boolean;
    invalid_email: boolean;
    email_required: boolean;
    signupForm: FormGroup
    user = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      first_name: "",
      last_name: "",
      phonenumber: "",
      country: [],
      state: [],
      city: [],
      newsletter: false,
    };
    separateDialCode = false;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    passwordError: any[];
    loginModel: any;
    isContent: any;
    countryData: any = [];
    stateData: any = [];
    cityData: any = [];

    countryConfig = {
      displayKey: 'name',
      search: true,
      height: 'auto',
      placeholder:'Select Country *',
      customComparator: ()=>{},
      limitTo: 0,
      moreText: 'more',
      noResultsFound: 'No results found!',
      searchPlaceholder:'Search',
      searchOnKey: 'name',
      clearOnSelection: false,
      inputDirection: 'ltr',
    }
    stateConfig = {
      displayKey: 'name',
      search: true,
      height: 'auto',
      placeholder:'Select State *',
      customComparator: ()=>{},
      limitTo: 0,
      moreText: 'more',
      noResultsFound: 'No results found!',
      searchPlaceholder:'Search',
      searchOnKey: 'name',
      clearOnSelection: false,
      inputDirection: 'ltr',
    }
    cityConfig = {
      displayKey: 'name',
      search: true,
      height: 'auto',
      placeholder:'Select City *',
      customComparator: ()=>{},
      limitTo: 0,
      moreText: 'more',
      noResultsFound: 'No results found!',
      searchPlaceholder:'Search',
      searchOnKey: 'name',
      clearOnSelection: false,
      inputDirection: 'ltr',
    }
    constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      public apiService: ApiService,
      public thirpApiService: ThirdPApiService,
      public modalService: NgbModal,
      public toastr: ToastrService,
      private loader: NgxSpinnerService,
      private socialAuthService: SocialAuthService,
      public generalService: GeneralService,
    ) {}

    ngOnInit() {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(["/customer/welcome-customer"]);
      }
      this.loadCountry();
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
    remeberMe(event:any){
      // if(this.user.remember){
      //   localStorage.setItem('is_remember', 'true');
      // }else{
      //   localStorage.setItem('is_remember', 'false');
      // }
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
      this.apiService
      .sociaLogin(payload,isUser)
      .subscribe((response: any) => {
        // console.log(response);
        if(response){
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
            username: this.user.first_name + this.user.last_name,
            email: this.user.email,
            password1: this.user.password1,
            password2: this.user.password2,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            phonenumber: this.user.phonenumber['e164Number'],
            city_id: this.user.city['id'],
            is_newsletter: this.user.newsletter,
          }
          console.log(payload);
          this.apiService
            .signup(payload)
            .subscribe((response: any) => {
              console.log(response);
              if(response.email){
                this.toastr.warning(response.email);
              }else if(response.username){
                this.toastr.warning(response.email);
              }else if(response.detail){
                this.toastr.success('Registration successfully done. Please check your email to verify account')
                this.changeBack.emit(true);
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
              }else if(errResponse['error']['phonenumber']){
                errResponse['error']['phonenumber'].forEach(element => {
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
          JSON.stringify(response[0])
        );
        this.toastr.success('Login Successfully');
        this.loader.hide();
        window.location.reload();
      });
    }
    loadCountry(){
      this.loader.show();
      this.thirpApiService
      .getCountries("id","no_page")
      .subscribe((response: any) => {
        console.log(response);
        this.countryData = response;
        this.loader.hide();
      });
    }
    loadState(countryId){
      this.loader.show();
      this.thirpApiService
      .getStates(countryId,"id","no_page")
      .subscribe((response: any) => {
        console.log(response);
        this.stateData = response;
        this.loader.hide();
      });
    }
    loadCity(stateId){
      this.loader.show();
      this.thirpApiService
      .getCities(stateId,"id","no_page")
      .subscribe((response: any) => {
        console.log(response);
        this.cityData = response;
        this.loader.hide();
      });
    }
    //on changes events
    countryChanged(data: any){
      console.log(data);
      if(data){
        this.stateData = [];
        this.cityData = [];
        this.user.state = [];
        this.user.city = [];
        this.loadState(data.id);
        console.log(this.user);
      }else{
        this.stateData = [];
        this.cityData = [];
        this.user.state = [];
        this.user.city = [];
      }
    }
    stateChanged(data: any){
      console.log(data);
      if(data){
        this.cityData = [];
        this.user.city = [];
        this.loadCity(data.id);
      }else{
        this.cityData = [];
        this.user.city = [];
      }
      console.log(this.user);
    }
    cityChanged(data: any){
      console.log(data);
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
    openLoginModal(modalContent:any, isWhere:string){
      this.changeBack.emit(true);
      this.isContent = isWhere;
      this.loginModel = this.modalService.open(modalContent, {windowClass: 'modal-holder'});
    }
    closeSignupModal(Event:any){
      this.changeBack.emit(true);
    }
  }
