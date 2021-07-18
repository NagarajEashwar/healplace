import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    public apiService : ApiService
  ) { }

  ngOnInit() {
    console.log('Admin Dashboard');
  }
}