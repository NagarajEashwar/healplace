import { Config, ThirdPConfig } from '../config/config';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = Config.BASE_URL;
  practitionerUrl = Config.PRACTITIONER_BASE_URL
  paymentUrl = Config.PAYMENT_BASE_URL;
  paymentConnectUrl = Config.PAYMENT_CONNECT_URL;
  adminBaseUrl = Config.ADMIN_BASE_URL;
  customerBaseUrl = Config.CUSTOMER_BASE_URL;
  apiUrl = this.baseUrl + "api/v1/";
  authApiUrl = this.baseUrl + "auth/api/v1/";
  adminApiUrl = this.baseUrl + "admin/api/v1/";
  practitionerApiUrl = this.practitionerUrl + "api/v1/";
  paymentApiUrl = this.paymentUrl + "api/v1/";
  paymentConnectApiUrl = this.paymentConnectUrl + "api/v1/";
  adminManagedUrl = this.adminBaseUrl + "api/v1/";
  thirdPConfig = ThirdPConfig.BASE_URL + "api/v1/";
  customerApiUrl = this.customerBaseUrl + "api/v1/";
  
  public getCustomerSubscriptionDetails(customerId) {
    return this.http.get<{ success: object }>(`${this.thirdPConfig}GetSubscriptionDetails/?customer_id=${customerId}`);
  }

  public getCustomerPlanDetails(plan_id) {
    return this.http.get<{ success: object }>(`http://18.223.16.137:8008/api/v1/GetPlanDetails/?plan_id=${plan_id}`);
  }

  public getPractitionerAvailabilityList(pid, from) {
    return this.http.get<{ success: object }>(`http://18.223.16.137:8006/api/v1/ViewPractitionerAvailability/?practitioner_id=${pid}&start_date=${from}`);
  }

  public chooseSessionType(pid, from, to, totalSession, totalBookedSession) {
    return this.http.get<{ success: object }>(`http://18.223.16.137:8006/api/v1/ChooseSessionType/${pid}/${from}/${to}/${totalSession}/${totalBookedSession}/`);
  }

  public chooseTimeSlot(cid, pid, sid, date, startTime) {
    return this.http.get<{ success: object }>(`${this.thirdPConfig}ChooseTimeSlot/${cid}/${pid}/${sid}/${date}/${startTime}/`);
  }

  public bookAppointment(payload) {
    return this.http.post<{ success: object }>(`${this.thirdPConfig}BookAppointment/`, payload);
  }

  public customerpaymentdetails() {
    return this.http.get<{ success: object }>(`${this.thirdPConfig}customerpaymentdetails/`);
  }

  public stripeCheckout(payload){
    return this.http.post<{ success: object }>(`http://18.223.16.137:8004/api/v1/stripe-checkout/`, payload);
  }

  public confirmingAppointment(payload){
    return this.http.post<{ success: object }>(`${this.thirdPConfig}CustomerPayment/`, payload);
  }

  public login(payload) {
    return this.http.post<{ success: object }>(`${this.apiUrl}login/`, payload);
  }
  public sociaLogin(payload, isSocial) {
    return this.http.post<{ success: object }>(`${this.apiUrl}${isSocial}/`, payload);
  }
  public forgotPassword(payload) {
    return this.http.post<{ success: object }>(`${this.apiUrl}password/reset/`, payload);
  }
  public signup(payload) {
    return this.http.post<{ success: object }>(`${this.apiUrl}register/`, payload);
  }
  public changeForgotResetPassword(payload, userId, userToken) {
    return this.http.post<{ success: object }>(`${this.apiUrl}password/reset/confirm/${userId}/${userToken}/`, payload);
  }

  public changePassword(payload) {
    // const headerDict = {
    //   "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    // }
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new Headers(headerDict), 
    // };
    // 
    return this.http.post<{ success: object }>(`${this.apiUrl}password/change/`, payload);
  }

  public getIntrest() {
    return this.http.get<{ success: object }>(`http://18.223.16.137:8002/api/v1/interest/`);
  }
  public getMoods(id) {
    return this.http.get<{ success: object }>(`http://18.223.16.137:8002/api/v1/mood/`);
  }
  public updateBasicInfo(payload, pkID) {
    return this.http.put<{ success: object }>(`http://18.223.16.137:8002/api/v1/customer/${pkID}/`, payload);
  }
  public updateMoodInfo(payload, pkID) {
    return this.http.put<{ success: object }>(`http://18.223.16.137:8002/api/v1/mood/${pkID}/`, payload);
  }
  public previousLoggedUpdate(payload, id) {
    return this.http.put<{ success: object }>(`http://18.223.16.137:8000/api/v1/redirect-to-questions/${id}/`, payload);
  }
  public pkIdUpdate(group, method) {
    if (group == "customer") {
      if (method == "post") {
        return this.http.post<{ success: object }>(`http://18.223.16.137:8002/api/v1/${group}/`, {});
      } else {
        return this.http.get<{ success: object }>(`http://18.223.16.137:8002/api/v1/${group}/`);
      }
    } else if (group == "admin") {
      if (method == "post") {
        return this.http.post<{ success: object }>(`http://18.223.16.137:8008/api/v1/${group}/`, {});
      } else {
        return this.http.get<{ success: object }>(`http://18.223.16.137:8008/api/v1/${group}/`);
      }
    } else if (group == "practitioner") {
      if (method == "post") {
        return this.http.post<{ success: object }>(`http://18.223.16.137:8006/api/v1/${group}/`, {});
      } else {
        return this.http.get<{ success: object }>(`http://18.223.16.137:8006/api/v1/${group}/`);
      }
    }
  }
  public getPractitionerSessionTypes() {
    return this.http.get(`${this.practitionerApiUrl}viewpractitionersessiontypes/`);
  }

  public getPractitionerDetails() {
    return this.http.get(`${this.practitionerApiUrl}practitioner/`);
  }

  // List of curated profile pictures
  public getCuratedProfilePictures() {
    return this.http.get(`${this.adminManagedUrl}curated-image-list/`);
  }

  // Practitioner sessions flow
  public getExpertise() {
    return this.http.get<{ success: object }>(`${this.practitionerApiUrl}expertise/`);
  }

  public getPractitionerSessions() {
    return this.http.get<{ success: object }>(`${this.practitionerApiUrl}practitionersession/`);
  }

  public addPractitionerSession(payload) {
    return this.http.post<{ success: object }>(`${this.practitionerApiUrl}practitionersession/`, payload);
  }

  public editPractitionerSession(payload, practitionerId) {
    return this.http.put<{ success: object }>(`${this.practitionerApiUrl}practitionersession/${practitionerId}/`, payload);
  }

  public getPractitionerSchedule(start_date, end_date) {
    return this.http.get<{ success: object }>(`${this.practitionerApiUrl}view-practitioner-availability/?end_date=${end_date}&start_date=${start_date}`);
  }

  public addBankAccount(payload) {
    return this.http.post<{ success: object }>(`${this.paymentApiUrl}practitionerbankdetails/`, payload);
  }

  public getBankAccount() {
    return this.http.get<{ success: object }>(`${this.paymentApiUrl}practitionerbankdetails/`);
  }

  public editBankAccount(payload, practitionerId) {
    return this.http.put<{ success: object }>(`${this.paymentApiUrl}practitionerbankdetails/${practitionerId}/`, payload);
  }

  public addConnectAccount(payload) {
    return this.http.post<{ success: object }>(`${this.paymentConnectApiUrl}create-connected-account/`, payload);
  }

  public getConnectAccount(connect_id) {
    return this.http.get<{ success: object }>(`${this.paymentConnectApiUrl}connected-account/${connect_id}/`);
  }

  public editConnectAccount(payload) {
    return this.http.put<{ success: object }>(`${this.paymentConnectApiUrl}edit-connected-account/`, payload);
  }

  public addDocumentVerification(payload) {
    return this.http.post<{ success: object }>(`${this.paymentConnectApiUrl}document-verification/`, payload);
  }

  public acceptTerms(connect_id) {
    return this.http.get<{ success: object }>(`${this.paymentConnectApiUrl}tos-acceptance/${connect_id}/`);
  }

  public reportPractitioner(payload) {
    return this.http.post<{ success: object }>(`http://18.223.16.137:8002/api/v1/report-practitioner/`, payload);
  }

  public blockCustomer(payload) {
    return this.http.post<{ success: object }>(`http://18.223.16.137:8006/api/v1/blockcustomer/`, payload);
  }

  public switchPractitioner(payload) {
    return this.http.post<{ success: object }>(`http://18.223.16.137:8002/api/v1/SwitchPractitioner/`, payload);
  }

  public followUpForm(payload) {
    return this.http.post<{ success: object }>(`http://18.223.16.137:8006/api/v1/follow-up-form/`, payload);
  }

  // Customer APIs
  public getCustomerDetails() {
    return this.http.get<{ success: object }>(`${this.customerApiUrl}DashBoard/`);
  }

  public getCustomerChats() {
    return this.http.get<{ success: object }>(`${this.customerApiUrl}chatsession-practitioner-list/`);
  }
}

