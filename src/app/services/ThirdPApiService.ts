import { ThirdPConfig } from '../config/config';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ThirdPApiService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = ThirdPConfig.BASE_URL;
  apiUrl = this.baseUrl + "api/v1/";

  public getCountries(field, name) {
    return this.http.get<{ success: object }>(`${this.apiUrl}country/?fields=${field},name&${name}`);
  }
  public getStates(countryId, field, name) {
    return this.http.get<{ success: object }>(`${this.apiUrl}state/?country=${countryId}&fields=${field},name&${name}`);
  }
  public getCities(stateId, field, name) {
    return this.http.get<{ success: object }>(`${this.apiUrl}city/?state=${stateId}&fields=${field},name&${name}`);
  }
  public getZoomMeetingSignature(id, role) {
    return this.http.get<{ success: object }>(`${this.apiUrl}ZoommeetingSinature/?meeting_id=${id}&role=${role}`);
  }
  public getZoomMeetingList(id) {
    return this.http.get<{ success: object }>(`${this.apiUrl}GetZoomMeetingId/?id=${id}`);
  }
  public generateMeettingSignature(role, meettingId) {
    return this.http.get<{ success: object }>(`${this.apiUrl}ZoommeetingSinature/?meeting_id=${meettingId}&role=${role}`);
  }
}

