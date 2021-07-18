import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { SubscriptionPlansService } from 'src/app/services/SubscriptionPlansService';
import { DataService } from 'src/app/services/DataService';
@Component({
    selector: 'customerpayment',
    templateUrl: './customer-payment-component.html',
    styleUrls: ['./customer-payment-component.scss'],
    providers: [AuthService]
})


export class CustomerPaymentComponent implements OnInit {

    SelectedPlanData : any;
    @Input() plan_id : string;
    constructor( private plansservice: SubscriptionPlansService,
        private dataservice : DataService) {}


    ngOnInit() {
        this.getSelectedPlanData();
    }


    getSelectedPlanData() {
            this.dataservice.currentMessage.subscribe(message => this.plan_id = message);
            this.plansservice.getplanDetails(this.plan_id).subscribe(
                response => {
                    console.log(response);
                    this.SelectedPlanData =  response;
                },
                error => { console.log(error); }
            );
        //}
    }
}