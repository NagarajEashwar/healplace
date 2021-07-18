import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  username: string;
  constructor() { }

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem("user_data"));
    this.username = userData?.user.first_name + ' ' + userData?.user.last_name;
  }

}
