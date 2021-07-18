import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';



@Component({
    selector: 'addpractitioner',
    templateUrl: './admin-add-practioner-component.html',
    styleUrls: ['./admin-add-practioner-component.scss'],
    providers: [AuthService]

})


export class AddPractionerComponent implements OnInit {
    AddPractitionerForm: FormGroup;


    constructor() {

    }


    ngOnInit() {
        this.AddPractitionerForm = new FormGroup({
            AddPractitionerFName: new FormControl(),
            AddPractitionerBName: new FormControl(),
            AddPractitionerEmail: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            AddPractitionerPhone: new FormControl(),
            AddPractitionerLocation: new FormControl(),
            AddPractitionerZip : new FormControl()
          });
    }


    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      }



      AddPractioner() {
        
        var practionerObj = {
            "first_name": this.AddPractitionerForm.get("AddPractitionerFName").value,
            "business_name": this.AddPractitionerForm.get("AddPractitionerBName").value,
            "email": this.AddPractitionerForm.get("AddPractitionerEmail").value,
            "phone_number": this.AddPractitionerForm.get("AddPractitionerPhone").value,
            "location": this.AddPractitionerForm.get("AddPractitionerLocation").value,
            "zip": this.AddPractitionerForm.get("AddPractitionerZip").value
          }
      
          if (this.AddPractitionerForm.invalid) {
            this.AddPractitionerForm.get('AddPractitionerFName').markAsTouched();
            this.AddPractitionerForm.get('AddPractitionerBName').markAsTouched();
            this.AddPractitionerForm.get('AddPractitionerEmail').markAsTouched();
            this.AddPractitionerForm.get('AddPractitionerPhone').markAsTouched();
            this.AddPractitionerForm.get('AddPractitionerLocation').markAsTouched();
            this.AddPractitionerForm.get('AddPractitionerZip').markAsTouched();
            return;
          }
      
      }

}