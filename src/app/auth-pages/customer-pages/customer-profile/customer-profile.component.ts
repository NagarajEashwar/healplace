import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/ApiService';
import { AuthService } from 'src/app/services/AuthService';
import { GeneralService } from 'src/app/services/GeneralService';
import { ThirdPApiService } from 'src/app/services/ThirdPApiService';
import { ProfilePictureModalComponent } from '../../popup-modals/profile-picture-modal/profile-picture-modal.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  userData: any;
  logedinData: any;
  isContent: string;
  model: any;
  profilePictureModal = ProfilePictureModalComponent;
  
  constructor(
    public apiService: ApiService,
    public router: Router,
    public thirdPApiService: ThirdPApiService,
    public auth: AuthService,
    public generalService: GeneralService,
    private loader: NgxSpinnerService,
    public toastr : ToastrService,
    private modalService: NgbModal,
  ) { }
  interests: Array<Object> = [{}];

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.logedinData = JSON.parse(localStorage.getItem("logedin_data"));
    console.log(this.logedinData);
    this.fetchInterests();
  }
  fetchInterests() {
    this.apiService
      .getIntrest()
      .subscribe((res: any) => {
        if (res) {
         this.interests = res;
        }
        this.loader.hide();
      },
      (errResponse: HttpErrorResponse) => {
        this.loader.hide();
      });
  }
  profileSubmit(){
    let payload = this.logedinData;
    console.log(payload);
    this.loader.show();
    this.apiService
    .updateBasicInfo(payload,payload["id"])
    .subscribe((response: any) => {
      localStorage.setItem(
        `logedin_data`,
        JSON.stringify(response)
      );
      this.toastr.success('Basic information updated successfully');
      this.loader.hide();
    });
  }
  openModal(modalContent: any, isWhere: string) {
    this.isContent = isWhere;
    this.model = this.modalService.open(modalContent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
  }
  closeModal(Event: any) {
    this.model.close();
  }
}
