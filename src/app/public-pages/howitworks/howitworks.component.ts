import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-public-howitworks-page',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.scss'],
  providers: [AuthService]
})
export class PublicHowitworksComponent implements OnInit {
  public _token: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public apiService: ApiService,
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/customer/welcome-customer"]);
    }
  }
}
