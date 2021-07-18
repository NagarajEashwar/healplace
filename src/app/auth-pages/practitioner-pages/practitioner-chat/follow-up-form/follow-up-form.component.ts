import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-up-form',
  templateUrl: './follow-up-form.component.html',
  styleUrls: ['./follow-up-form.component.scss']
})
export class FollowUpFormComponent implements OnInit {

  option = null;
  currentStep = 'one';
  question = null;
  ansTypeOption;
  freqOption;
  cid = 'f0c1e8d6-0666-47f9-bf24-0f276a53a649';
  question_about = {
    'first': 'About progress',
    'second': 'About health habits',
    'third': 'something else'
  };
  answer_type = {
    'first': 'Scale of 1-5',
    'second': 'Yes/No'
  };
  frequency = {
    'first': 'One time',
    'second': 'Daily',
    'third': 'Weekly'
  };

  constructor(
    public apiService: ApiService,
    private loader: NgxSpinnerService,
    public toastr: ToastrService,
    public router: Router,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  optionSelected(option) {
    this.option = option;
  }
  addQuestion() {
    this.currentStep = 'two';
  }
  closeModal() {
    this.activeModal.close();
  }

  onQuestion(val){

  }
chooseAnswerType(){
  this.currentStep = 'three';
}
ansTypeOptionSelected(option){
  this.ansTypeOption = option;
}
chooseFreq(){
  this.currentStep = 'four';
}
freqOptionSelected(option){
  this.freqOption = option;
}
sendForm(){
  const payload = {
    'question_about': this.question_about[this.option],
    'question': this.question,
    'answer_type': this.answer_type[this.ansTypeOption],
    'frequency': this.frequency[this.freqOption],
    'enable': true,
    'customer': this.cid
  };
  this.loader.show();
  this.apiService.followUpForm(payload)
    .subscribe((report: any) => {
      console.log('followUpForm', report);
      this.loader.hide();
      this.toastr.success('Follow up form Submitted successfully');
      this.currentStep = 'five';
    }, (error) => {
      console.log('followUpForm error', error);
      this.loader.hide();
    });
}
backToDashBoard(){
  this.activeModal.close();
  this.router.navigate(['welcome-practitioner']);
}
}
