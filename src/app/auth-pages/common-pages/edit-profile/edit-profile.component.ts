import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePictureModalComponent } from '../../popup-modals/profile-picture-modal/profile-picture-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public _token: any;
  hideHeader: any = true;
  model: any;
  isContent: any;
  profilePictureModal = ProfilePictureModalComponent;
  sessionCount = 0;
  expertiseCount = 0;
  practitionerDetails: any = {};
  userData: any = {};
  sessionSubscription: Subscription;
  expertiseSubscription: Subscription;
  practitionerSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.sessionSubscription = this.apiService.getPractitionerSessionTypes().subscribe((result: any) => {
      this.sessionCount = result.count;
    });
    this.expertiseSubscription = this.apiService.getExpertise().subscribe((result: any) => {
      this.expertiseCount = result.count;
    });
    this.practitionerSubscription = this.apiService.getPractitionerDetails().subscribe((result: any) => {
      if (result.count > 0 && result.results[0]) {
        this.practitionerDetails = { ...result.results[0] };
      }
    });
    this.userData = this.authService.getUser();
  }
  openModal(modalContent: any, isWhere: string) {
    this.isContent = isWhere;
    this.model = this.modalService.open(modalContent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
  }
  closeModal(Event: any) {
    this.model.close();
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
    this.expertiseSubscription.unsubscribe();
    this.practitionerSubscription.unsubscribe();
  }
}
