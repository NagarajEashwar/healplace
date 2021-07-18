import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})
export class PublicNavbarComponent implements OnInit {
  public _token: any;
  hideHeader: any = true;
  model: any;
  isContent: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/dashboard"]);
    }
  }
  openModal(modalContent:any, isWhere:string) {
    this.isContent = isWhere;
    this.model = this.modalService.open(modalContent, {windowClass: 'modal-holder'});
  }
  closeModal(Event:any){
    this.model.close();
  }
}
