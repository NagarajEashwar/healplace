import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { ContactUsService } from 'src/app/services/contact-service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-public-contact-us-page',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [AuthService]
})
export class PublicContactusComponent implements OnInit {
  public _token: any;
  breadCrumbItems: Array<{}>;
  isCollapsed: boolean;
  contactUsDynamicObj:any
  showAlert: boolean = false;
  ContactUsForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    private fb: FormBuilder,
    public contactService: ContactUsService,
    
  ) {}

  ngOnInit() {

    this.ContactUsForm = new FormGroup({
      ContactFormFName: new FormControl(),
      ContactFormLName: new FormControl(),
      ContactFormEmail: new FormControl('', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      ContactFormPhNo: new FormControl(),
      ContactFormMessage: new FormControl()
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/customer/welcome-customer"]);
    }
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  Submit() {


    var contactObj = {
      "first_name": this.ContactUsForm.get("ContactFormFName").value,
      "last_name": this.ContactUsForm.get("ContactFormLName").value,
      "email": this.ContactUsForm.get("ContactFormEmail").value,
      "phone_number": this.ContactUsForm.get("ContactFormPhNo").value,
      "message": this.ContactUsForm.get("ContactFormMessage").value
    }

    if (this.ContactUsForm.invalid) {
      this.ContactUsForm.get('ContactFormFName').markAsTouched();
      this.ContactUsForm.get('ContactFormLName').markAsTouched();
      this.ContactUsForm.get('ContactFormEmail').markAsTouched();
      this.ContactUsForm.get('ContactFormPhNo').markAsTouched();
      this.ContactUsForm.get('ContactFormMessage').markAsTouched();
      return;
    }


   
    this.contactService.contact(contactObj).subscribe(
      response => {
        console.log(response);
        this.ContactUsForm.reset();
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 4000);

      },
      error => { console.log(error); }

    );
  }


}
