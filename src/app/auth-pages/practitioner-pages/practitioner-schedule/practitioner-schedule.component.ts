import { Component, OnInit } from '@angular/core';
import '../../../services/dateExtension';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../services/ApiService';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-practitioner-schedule',
  templateUrl: './practitioner-schedule.component.html',
  styleUrls: ['./practitioner-schedule.component.scss']
})
export class PractitionerScheduleComponent implements OnInit {
  settings = {
    availability: [],
    isMultiple: false,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    selectedDates: [],
    startDate: null,
    weekdays: ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'],
  }
  days = [];
  schedule = [];
  week: string;
  constructor(
    public apiService: ApiService,
    private loader: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var currentDate = new Date();
    var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 6)).toUTCString();
    this.settings.startDate = new Date(firstday);
    this.getDatesHeader();
    this.getNavControl();
    this.settings.availability = this.getTime(0, 24);
  }
  changeWeek(week) {
    this.days = [];

    this.settings.startDate = week.startdate;
    this.getDatesHeader();
    this.getNavControl();
  }
  getTime(startTime, endTime) {
    var time = [];
    var currentTime = startTime;
    while (currentTime < endTime) {
      const suffix = (currentTime >= 12) ? 'pm' : 'am';
      const tempTime = ((currentTime + 11) % 12 + 1);
      time.push({
        displayTime: tempTime + ':00' + suffix,
        time: currentTime + ':00',
      });
      currentTime++;
    }
    return time;
  }

  getMonthName(idx) {
    return this.settings.months[idx];
  };

  getDatesHeader() {
    for (let i = 0; i < 7; i++) {
      var d = this.settings.startDate.addDays(i);
      this.days.push({
        fullDate: d,
        date: d.getDate(),
        day: this.settings.weekdays[d.getDay()],
        month: this.settings.startDate.getMonth() + 1,
        monthName: this.getMonthName(this.settings.startDate.getMonth()),
        utc: d.toJSON().slice(0, 10),
        available: [],
        disable: []
      })
    }
  }
  getNavControl() {
    const firstday = this.days[0].day + ', ' + this.days[0].monthName + ' ' + this.days[0].date;
    const lstday = this.days.length - 1;
    const lastday = this.days[lstday].day + ', ' + this.days[lstday].monthName + ' ' + this.days[lstday].date;
    this.week = firstday + ' - ' + lastday;
    this.fetchSchedule(this.days[0].utc, this.days[lstday].utc);
  };
  previousWeek() {
    this.days = [];

    this.settings.startDate = this.settings.startDate.addDays(-7);
    this.getDatesHeader();
    this.getNavControl();
  }
  nextWeek() {
    this.days = [];
    this.settings.startDate = this.settings.startDate.addDays(7);
    this.getDatesHeader();
    this.getNavControl();
  }

  formatDate(d) {
    var date = '' + d.getDate();
    var month = '' + (d.getMonth() + 1);
    var year = d.getFullYear();
    if (date.length < 2) {
      date = '0' + date;
    }
    if (month.length < 2) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + date;
  }

  fetchSchedule(start_date, end_date) {
    this.loader.show();
    this.apiService.getPractitionerSchedule(start_date, end_date).subscribe((response: any) => {
      this.schedule = response;
      console.log('this.schedule', this.schedule);
      function ConvertNumberToTwoDigitString(n) {
        return n > 9 ? "" + n : "0" + n;
      }
      this.schedule.forEach((item) => {
        let start_time = new Date(item.start_time).getUTCHours();
        let end_time = new Date(item.end_time).getUTCHours();
        const dt = new Date(item.start_time).getDate();
        let time = [];
        while (start_time <= end_time) {
          time.push(ConvertNumberToTwoDigitString(start_time++) + ':00');
        }
        const times = this.days.filter((day) => {
          return day.date === dt;
        });
        if (times && times.length > 0 && time.length > 0 && item.is_from_appointment) {
          times[0].available = times[0].available.concat(time);
        }
        if (times && times.length > 0 && time.length > 0 && !item.is_available) {
          times[0].disable = times[0].disable.concat(time);
        }
      });
      this.loader.hide();
    },
      (errResponse) => {
        this.loader.hide();
      }
    );
  }

  editSchedule() {
    console.log('this.settings.startDate', this.settings.startDate);
    this.router.navigate(['practitioner/edit-schedule/'], { queryParams: { date: moment(this.settings.startDate).format('YYYY-MM-DD') }})
  }
};

