import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-session',
  templateUrl: './confirm-session.component.html',
  styleUrls: ['./confirm-session.component.scss']
})
export class ConfirmSessionComponent implements OnInit {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() type: string;
  @Input() session: any;
  @Output() confirmCallBack = new EventEmitter<any>();
  @Output() confirmBack = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    if (this.type === 'edit') {
      this.title = "Confirm details for this Session";
      this.buttonText = 'Confirm';
    }
  }
  nextChange(session) {
    this.confirmCallBack.emit(session);
  }
  back() {
    this.confirmBack.emit();
  }
}
