import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChooseSessionTypeModel } from './choose-session-type.model';
import { ApiService } from '../../../services/ApiService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './ngbdmodalcontent.component.html',
  styleUrls: ['./customer-booking.component.scss'],
})
export class NgbdModalContent {
  @Input() name: any;
  @Input() chooseSessionTypeModel: ChooseSessionTypeModel;
  selectedIndexPackages: number;
  selectedIndexOthers: number;
  selected: any;
  showSelected: boolean = false;
  selection: any;
  showConfirmDoctorName: boolean = false;
  showConfirmDoctorNamePrevious: boolean = true;
  showBookAndTime: boolean = false;
  showConfirmBooking: boolean = false;
  showConfirmBookingStep2: boolean = false;
  selectedDate: any;
  confirmDoctorNameDisabled: boolean = true;
  confirmDoctorNameSubDisabled: boolean = true;
  shortSessionTitle: string;
  shortDescription: string;
  selectionTimeslot: any;
  bsValue: Date = new Date();
  showSelectionPayCard: boolean = false;
  confirmBookingStep2Disabled: boolean = true;
  showTotalConfirmBooked: boolean = false;
  showAddNewPayment: boolean = false;
  userData;
  timeslotPractitioner = [];
  subscriptionDetails;
  planDetails;
  sessiontTypeDetails;
  isShowBackButton = true;
  paymentCardDetails;
  buttonText = 'Add Card';
  pId = '398ac134-372f-4309-85a3-363c711d52cb';
  cid = 'f0c1e8d6-0666-47f9-bf24-0f276a53a649';
  sid;
  appointment;
  stripeCheckOutDetails;
  minDate = new Date();
  isIncluded = false;

  constructor(public activeModal: NgbActiveModal,
    public apiService: ApiService,
    private loader: NgxSpinnerService,
    public toastr: ToastrService,
    public router: Router,
    ) {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.loader.show();
    this.getCustomerSubscriptionDetails();
    this.customerpaymentdetails();
  }

  onValueChange(date){
    this.getPractitionerAvailabilityList(new Date(this.bsValue).toISOString().slice(0, -14));
  }

  getCustomerSubscriptionDetails() {
    this.apiService.getCustomerSubscriptionDetails(this.cid)
      .subscribe((subscription: any) => {
        console.log('subscription', subscription);
        this.subscriptionDetails = subscription;
        this.getCustomerPlanDetails(subscription.plan_id);
      }, (error) => {
        console.log('subscription error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  getCustomerPlanDetails(planId) {
    this.apiService.getCustomerPlanDetails(planId)
      .subscribe((plan: any) => {
        console.log('plan', plan);
        this.planDetails = plan;
        const payload = {
          pid: this.pId,
          from: this.subscriptionDetails.subscribed_on,
          to: this.subscriptionDetails.subscription_ends_on,
          totSession: plan.plan[0].number_of_session,
          bookedSession: this.subscriptionDetails.total_session_booked
        };
        this.chooseSessionType(payload);
      }, (error) => {
        console.log('plan error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  chooseSessionType(payload) {
    this.apiService.chooseSessionType(payload.pid, payload.from, payload.to, payload.totSession, payload.bookedSession)
      .subscribe((sessionType) => {
        console.log('sessionType', sessionType);
        this.sessiontTypeDetails = sessionType;
        this.loader.hide();
      }, (error) => {
        console.log('sessionType error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  getPractitionerAvailabilityList(from) {
    this.apiService.getPractitionerAvailabilityList(this.pId, from)
      .subscribe((pList: any) => {
        console.log('pList', pList);
        this.timeslotPractitioner = pList.response;
        this.loader.hide();
        if(this.timeslotPractitioner && this.timeslotPractitioner.length === 0){
          this.toastr.error('No schedule available for selected Date');
        }
      }, (error) => {
        console.log('pList error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  chooseTimeSlot(cid, pid, sid, date, startTime) {
    this.apiService.chooseTimeSlot(cid, pid, sid, date, startTime)
      .subscribe((chooseTimeSlot: any) => {
        console.log('chooseTimeSlot', chooseTimeSlot);
        this.loader.hide();
      }, (error) => {
        console.log('chooseTimeSlot error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  customerpaymentdetails() {
    this.apiService.customerpaymentdetails()
      .subscribe((paymentCardDetails:any) => {
        console.log('paymentCardDetails', paymentCardDetails);
        paymentCardDetails.forEach(element => {
          if(element && element.is_default){
            this.paymentCardDetails = element;
          }
        });
      }, (error) => {
        console.log('paymentCardDetails error', error);
        this.toastr.error(error. statusText);
      });
  }

  bookAppointment() {
    const payload = {
      'practitioner_session': this.sid,
      'start_time': new Date(this.selectionTimeslot.start_time).toISOString().slice(11, -5),
      'appointment_date': new Date(this.bsValue).toISOString().slice(0, -14),
      'customer': this.cid,
      'customerpaymentdetail': null,
      'subscription': this.subscriptionDetails.id
    };
    this.apiService.bookAppointment(payload)
      .subscribe((appointment) => {
        console.log('appointment', appointment);
        this.appointment = appointment;
        if(!this.isIncluded){
          this.stripeCheckout();
        } else {
          this.loader.hide();
        }
      }, (error)=>{
        console.log('appointment error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  stripeCheckout() {
    const payload = {
      'cc_number': this.paymentCardDetails.cc_number,
      'exp_month': this.paymentCardDetails.cc_expiry.slice(0, -3),
      'exp_year': this.paymentCardDetails.cc_expiry.slice(3),
      'cvc': 316,
      'session_amount': this.selection.price,
      'description': '',
      'country': 'US'
    };
    this.apiService.stripeCheckout(payload)
      .subscribe((stripe: any) => {
        console.log('stripe', stripe);
        this.stripeCheckOutDetails = stripe;
        if (stripe && stripe.has_paid){
          this.confirmingAppointment();
        } else{
          this.loader.hide();
        }
      }, (error)=>{
        console.log('stripeCheckout error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  confirmingAppointment() {
    const payload = {
      'transactionid': this.stripeCheckOutDetails.transaction_id,
      'haspaid': this.stripeCheckOutDetails.has_paid,
      'paymentinfo': '',
      'subscription': null,
      'customer': this.cid,
      'appointment': this.appointment.id
    };
    this.apiService.confirmingAppointment(payload)
      .subscribe((confirmingAppointment) => {
        console.log('confirmingAppointment', confirmingAppointment);
        this.loader.hide();
      }, (error)=>{
        console.log('confirmingAppointment error', error);
        this.loader.hide();
        this.toastr.error(error. statusText);
      });
  }

  clickFunction(value, flag) {
    console.log(value)
    this.isIncluded = flag;
    this.confirmBookingStep2Disabled = !flag;
    this.selection = value;
    this.showSelected = true;
    this.confirmDoctorNameDisabled = false;
    this.sid = value.id;

  }

  confirmDoctorName() {
    this.showConfirmBooking = false;
    this.showConfirmDoctorName = true;
    this.showConfirmDoctorNamePrevious = false;
    this.showBookAndTime = false;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
  }

  confirmDoctorNameBack() {
    this.showConfirmBooking = false;
    this.showConfirmDoctorNamePrevious = true;
    this.showConfirmDoctorName = false;
    this.showBookAndTime = false;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
  }

  confirmDoctorNameSub() {
    this.showConfirmBooking = false;
    this.showConfirmDoctorName = false;
    this.showConfirmDoctorNamePrevious = false;
    this.showBookAndTime = true;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
    this.loader.show();
    this.getPractitionerAvailabilityList(new Date(this.bsValue).toISOString().slice(0, -14));
  }

  confirmDoctorNameSubBack() {
    this.showConfirmBooking = false;
    this.showConfirmDoctorNamePrevious = false;
    this.showConfirmDoctorName = true;
    this.showBookAndTime = false;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
  }

  bookSession() {
    this.showConfirmDoctorName = false;
    this.showConfirmDoctorNamePrevious = false;
    this.showBookAndTime = false;
    this.showConfirmBooking = true;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
  }
  goBackToConfirmScreen(event) {
    console.log('goBackToConfirmScreen', event);
    this.confirmBookingStep1();
  }
  saveCardDetails(event) {
    console.log('saveCardDetails', event);
    this.paymentCardDetails = event;
    this.confirmBookingStep2();
  }
  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
  }

  onSearchChange(searchValue: string): void {
    this.confirmDoctorNameSubDisabled = false;
    console.log(searchValue);
  }

  timeslotPractitionerSelect(value) {
    console.log(value)
    this.selectionTimeslot = value;
    //this.showSelected = true;
    //this.confirmDoctorNameDisabled = false;
  }

  confirmBookingStep1() {
    this.showConfirmDoctorName = false;
    this.showConfirmDoctorNamePrevious = false;
    this.showBookAndTime = false;
    this.showConfirmBooking = false;
    this.showConfirmBookingStep2 = true;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
    this.loader.show();
    this.chooseTimeSlot(this.cid, this.pId, this.sid, new Date(this.bsValue).toISOString().slice(0, -14), new Date(this.selectionTimeslot.start_time).toISOString().slice(11, -5));
  }

  confirmBookingStep1Back() {
    this.showConfirmDoctorName = false;
    this.showConfirmDoctorNamePrevious = false;
    this.showBookAndTime = true;
    this.showConfirmBooking = false;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
  }

  confirmBookingStep2() {
    this.showTotalConfirmBooked = true;
    this.showConfirmDoctorName = false;
    this.showConfirmDoctorNamePrevious = false;
    this.showBookAndTime = false;
    this.showConfirmBooking = false;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = false;
    this.loader.show();
    this.bookAppointment();
  }
  addNewPayment() {
    this.showTotalConfirmBooked = false;
    this.showConfirmDoctorName = false;
    this.showConfirmDoctorNamePrevious = false;
    this.showBookAndTime = false;
    this.showConfirmBooking = false;
    this.showConfirmBookingStep2 = false;
    this.showSelectionPayCard = false;
    this.showAddNewPayment = true;
  }

  paymentMethodPayCard() {
    this.showSelectionPayCard = true;
    this.confirmBookingStep2Disabled = false;
  }
closeModal(){
  this.activeModal.close();
  this.router.navigate(['welcome-customer']);
}
}