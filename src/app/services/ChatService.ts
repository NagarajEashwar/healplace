import { Config } from '../config/config';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = Config.BASE_URL;
  practitionerUrl = Config.PRACTITIONER_BASE_URL
  customerBaseUrl = Config.CUSTOMER_BASE_URL;
  practitionerApiUrl = this.practitionerUrl + "api/v1/";
  customerApiUrl = this.customerBaseUrl + "api/v1/";

  public getCustomerToken() {
    return this.http.get<{ success: object }>(`${this.customerApiUrl}ChatAccessToken/`);
  }

  public getPractitionerToken() {
    return this.http.get<{ success: object }>(`${this.practitionerApiUrl}ChatAccessToken/`);
  }

  public getPractitionerList() {
    return this.http.get<{ success: object }>(`${this.customerApiUrl}chatsession-practitioner-list/ `);
  }

  public getCustomerList() {
    return this.http.get<{ success: object }>(`${this.practitionerApiUrl}chatsession-customer-list/ `);
  }

  public createChannel(data) {
    return this.http.post<{ success: object }>(`${this.customerApiUrl}chat-session/`, data);
  }
}