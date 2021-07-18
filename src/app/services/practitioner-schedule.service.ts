import { ThirdPConfig } from '../config/config';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PractitionerScheduleService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = ThirdPConfig.BASE_URL;
  apiUrl = this.baseUrl + "api/v1/";

  public saveAvailablity(data) {
    return this.http.post<{ success: object }>(`http://18.223.16.137:8006/api/v1/create-practitioner-availability/`, data);
  }

  public duplicateSchedule(data) {
    return this.http.post<{ success: object }>(`http://18.223.16.137:8006/api/v1/CopySchedules/`, data);
  }
}