import { Injectable } from "@angular/core";
import {  HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class SubscriptionPlansService {
    constructor(
        private http: HttpClient,
      ) { }

    apiUrlPlans = "http://18.223.16.137:8008/api/v1/";
    apiUrlSubscription = "http://18.223.16.137:8002/api/v1/subscription/";
    apiUrlPlan = "http://18.223.16.137:8008/api/v1/GetPlanDetails/";


    public getsubscriptionplans(plan_type){
        return this.http.get<{success: object}>(`${this.apiUrlPlans}GetPlanDetails/?plan_type=${plan_type}`);
      }
      public getsubscription(){
        return this.http.get<{success: object}>(`${this.apiUrlSubscription}`);
      }
      public getplanDetails(plan_id){
        let params = new HttpParams().set("plan_id",plan_id); //Create new HttpParams
        params.append("plan_id", plan_id);
        return this.http.get<{success: object}>(`${this.apiUrlPlan}`, { params: params });
      }
}