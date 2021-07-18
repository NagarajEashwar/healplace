import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/AuthService';
import { SubscriptionPlansService } from 'src/app/services/SubscriptionPlansService';
import { DataService } from 'src/app/services/DataService';

@Component({
    selector: 'mysubscription',
    templateUrl: './my-subscription-component.html',
    styleUrls: ['./my-subscription.component.scss'],
    encapsulation: ViewEncapsulation.None,
})


export class MySubscriptionComponent implements OnInit {

    selectedItem: string = '0';
    showPackageItems: string = 'Monthly Pricing';
    PlanData: any;
    plan_input= "Monthly Pricing";

    MonthlyData = [];
    ThreeMonthData = [];
    SixMonthData = [];
    AnnualData = [];
    request : any;
    message: any = "";

   
    
    constructor(private router: Router,
        private authService: AuthService,
        private plansservice: SubscriptionPlansService,
        private dataservice : DataService
        ) { }
        

    ngOnInit() {
        this.getPlanData(this.plan_input);
    }


    getPlanData(plan_input) {
        this.plansservice.getsubscriptionplans(plan_input).subscribe(
            response => {
                this.PlanData = response;   
                    if(plan_input == '3 Months') {
                        this.ThreeMonthData = this.PlanData.plan; 
                    }
                    if(plan_input == '6 Months') {
                        this.SixMonthData = this.PlanData.plan;
                    }
                    if(plan_input == 'Monthly Pricing') {
                        this.MonthlyData = this.PlanData.plan;
                    }
                    if(plan_input == 'Annually') {
                        this.AnnualData = this.PlanData.plan;
                    }
            },
            error => { console.log(error); }
        );
    }


    private messageSource = new BehaviorSubject(this.message);
    currentMessage = this.messageSource.asObservable();
    public set value(v : string) {
        this.message = this.messageSource;
    }
    
    ChooseClick(data, planid) {

        this.selectedItem = data;


        this.messageSource = planid.id;
        this.dataservice.changeMessage(planid.id);
        this.request=
            {
                "offer_id": "123e4567-e89b-12d3-a456-426614174000",
                "plan_id": 0,
                "unsubscribe_date": null,
                "reason": "",
                "customer": "607cdc72-34bb-475e-a8a9-cda8ce674837",
                "parent_id": null
            }

        this.request.plan_id = planid.id;

       
        this.plansservice.getsubscription().subscribe(
            response => {
                console.log(response);
            },
            error => { console.log(error); }
        );
        if (this.authService.isAuthenticated()) {
            this.router.navigate(["/customerpayment"]);
        }
    }

    ShowPackage(data,apiInput) {
        this.showPackageItems = data;
        this.getPlanData(apiInput);

    }

}