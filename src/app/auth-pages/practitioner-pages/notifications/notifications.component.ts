import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  duration: any = 2;
  method: any = 3;
  reminder: any = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
