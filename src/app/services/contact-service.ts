import { Injectable } from "@angular/core";
import {  HttpClient } from '@angular/common/http';


@Injectable()
export class ContactUsService {
    constructor(
        private http: HttpClient,
      ) { }

      apiUrl = "http://18.223.16.137:8008/api/v1/ContactUs/";

    public contact(InputData){
        console.log(InputData);
        return this.http.post<{success: object}>(`${this.apiUrl}`, InputData);
      }
}