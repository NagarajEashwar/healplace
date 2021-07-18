import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'public-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
  providers: [AuthService]
})
export class ForgotPasswordModalComponent implements OnInit {
  @Input() resource: any;
  @Output() changeBack = new EventEmitter<any>();

  public _token: any;
  invalid_email: boolean;
  email_required: boolean;
  forgotForm: FormGroup;
  submitted = false;
  user = {
    email: "",
  };
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
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/customer/welcome-customer"]);
    }
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
  onSubmit(){
    if (this.user) {
      this.loader.show();
      let payload = {
        email: this.user.email,
      }
      console.log(payload);
      //return;
      this.apiService
        .forgotPassword(payload)
        .subscribe((response: any) => {
          if(response){
            this.loader.hide();
            this.toastr.success(response.detail);
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
  closeForgotModal(Event:any){
    this.changeBack.emit(true);
  }
}
