import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService';
import { PractitionerSessionService } from 'src/app/services/Practitioner-session.service';
@Component({
  selector: 'practitionersessions',
  templateUrl: './practitioner-session.component.html',
  styleUrls: ['./practitioner-session.component.scss'],
  providers: [AuthService],
  encapsulation: ViewEncapsulation.None,
})
export class PractitionerSessionComponent implements OnInit {
  hideMessage = [];
  constructor(
    private practionerSession : PractitionerSessionService
  ) { }

  ngOnInit() {
    console.log('Practitioner Dashboard');
  }


  ShowPopup(data) {
    this.hideMessage[data] = true;
  }

  closeMessage(data) {
    this.hideMessage[data] = false;
   console.log(this.hideMessage[data] = false);
   
   
  }


}