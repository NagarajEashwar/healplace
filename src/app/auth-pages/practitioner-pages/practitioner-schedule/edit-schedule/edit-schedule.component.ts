import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import '../../../../services/dateExtension';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../services/ApiService';
import { Router, ActivatedRoute } from '@angular/router';
import { PractitionerScheduleService } from '../../../../services/practitioner-schedule.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit {

  settings = {
    availability: [],
    isMultiple: false,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    selectedDates: [],
    startDate: null,
    weekdays: ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'],
  }
  selectedIndex: any;
  text: any = '';
  days = [];
  schedule = [];
  week: string;
  timeSchedule: any = [
    '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm'
  ]
  scheduleList: any = [];
  selectedDate: any;

  @ViewChild('CopyToAllModal') CopyToAllModal: TemplateRef<any>;
  @ViewChild('DuplicateScheduleModal') DuplicateScheduleModal: TemplateRef<any>;

  constructor(
    public apiService: ApiService,
    private loader: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private practitionerScheduleService: PractitionerScheduleService,
    public modalService: NgbModal,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.date) {
        this.selectedDate = params.date;
      }
    });
  }

  ngOnInit(): void {
    var firstday;
    var currentDate;
    if (this.selectedDate) {
      firstday = new Date(this.selectedDate).toUTCString();
    } else {
      currentDate = new Date();
      firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 6)).toUTCString();
    }
    this.settings.startDate = new Date(firstday);
    this.getDatesHeader()
      .then(() => {
        this.getNavControl();
      })
    this.settings.availability = this.getTime(0, 24);
  }
  changeWeek(week) {
    this.days = [];

    this.settings.startDate = week.startdate;
    this.getDatesHeader()
      .then(() => {
        this.getNavControl();
      })
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
    return new Promise((resolve, reject) => {
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
          disable: [],
          isAdd: false,
          checked: false
        })
      }
      resolve(true);
    })
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
    this.getDatesHeader()
      .then(() => {
        this.getNavControl();
      })
  }
  nextWeek() {
    this.days = [];
    this.settings.startDate = this.settings.startDate.addDays(7);
    this.getDatesHeader()
      .then(() => {
        this.getNavControl();
      })
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
    const end = new Date(end_date);
    end_date = end.setDate(new Date(end_date).getDate() + 1);
    end_date = new Date(end_date).toJSON().slice(0, 10);
    this.apiService.getPractitionerSchedule(start_date, end_date).subscribe((response: any) => {
      this.schedule = response;
 
      this.schedule.forEach((item) => {
        let date = new Date(item.start_time).toJSON().slice(0, 10)
        let practioner = item.practitioner;
        this.days.forEach((day) => {
          if (day.utc === date) {
            const start = new Date(item.start_time).getUTCHours();
            const end = new Date(item.end_time).getUTCHours();
            const startClock = (start >= 12) ? 'PM' : 'AM';
            const endClock = (end >= 12) ? 'PM' : 'AM'
            const available = {
              start: ((start + 11) % 12 + 1) + ':' + '00' + ' ' + startClock,
              end: ((end + 11) % 12 + 1) + ':' + '00' + ' ' + endClock,
              start_time: item.start_time,
              end_time: item.end_time,
              practioner: practioner,
              id: item.id
            }
            day.available.push(available);
          }
        });
      });
      this.scheduleList = this.days;
      this.loader.hide();
    },
      (errResponse) => {
        this.loader.hide();
      }
    );
  }

  addNewSchedule(i) {
    if (this.days[i].available.length !== 0)
      this.scheduleList[i].isAdd = !this.days[i].isAdd;
  }

  addTime(text, time, i, j) {
    const currentDate = new Date();
    const selectedTime = time;
    const d = moment(currentDate).format('L');
    const date = moment(d + ' ' + selectedTime).format();

    if (j === undefined || j === null) {
      if (text === 'From') {
        this.scheduleList[i].available.push({
          start_time: date,
          end_time: moment(date).add(1, 'hours').format(),
          isNew: true
        });
      } else if (text === 'To') {
        this.scheduleList[i].available.push({
          start_time: moment(date).subtract(1, 'hours').format(),
          end_time: date,
          isNew: true
        });
      }
    } else {
      if (text === 'From') {
        this.scheduleList[i].available[j].start_time = date;
      } else if (text === 'To') {
        this.scheduleList[i].available[j].end_time = date;
      }
      this.scheduleList[i].available[j].isUpdated = true;
    }
    this.scheduleList[i].isAdd = false;
  }

  saveSchedule() {
    let data = {};
    let create_data = [];
    let update_data = [];
    this.scheduleList.forEach((schedule) => {
      // let create_data = {};
      // let update_data = {};
      if (schedule.available.length !== 0) {
        let newArr = [];
        let updateArr = [];
        schedule.available.forEach((item) => {
          if (item.isNew) {
            const arr = [];
            arr.push(moment(item.start_time).format('HH:mm'));
            arr.push(moment(item.end_time).format('HH:mm'))
            newArr.push(arr);
          } else if (item.isUpdated) {
            const arr = [];
            arr.push(moment(item.start_time).format('HH:mm'));
            arr.push(moment(item.end_time).format('HH:mm'))
            update_data.push({
              'record_id': item.id,
              'update_times': arr
            });
          }
        })
        if (newArr.length > 0) {
          create_data.push({
            [schedule.utc]: newArr
          })
        }
      }
    });

    data = {
      'create_data': create_data,
      'update_data': update_data,
      'delete_data': []
    }

    this.practitionerScheduleService.saveAvailablity(data).subscribe((success) => {
      this.router.navigate(['practitioner/schedule']);
    }, (err) => {
      console.log('errerr', err);
    });
  }

  selectItem(i) {
    this.scheduleList[i].checked = !this.scheduleList[i].checked;
  }

  openCopyToAllConfirmModal(i) {
    this.selectedIndex = i;
    this.modalService.open(this.CopyToAllModal, { windowClass: 'modal-copy-to-all', size: 'md' });
  }

  openDuplicateScheduleConfirmModal() {
    this.modalService.open(this.DuplicateScheduleModal, { windowClass: 'modal-copy-to-all', size: 'md' });
  }

  duplicateSchedule() {
    const dates = [];
    this.scheduleList.forEach((item) => {
      if (item.checked) {
        dates.push(item.utc)
      }
    })

    if (dates.length === 0) return;

    this.practitionerScheduleService.duplicateSchedule({ dates: dates }).subscribe((success) => {
      this.modalService.dismissAll();
      this.router.navigate(['practitioner/schedule']);
    }, (err) => {
      console.log('err', err);
    })
  }

  copySchedule() {
    const available = this.scheduleList[this.selectedIndex].available;
    let newArr = [];
    available.forEach((item) => {
      const arr = [];
      arr.push(moment(item.start_time).format('HH:mm'));
      arr.push(moment(item.end_time).format('HH:mm'));
      newArr.push(arr);
    });

    const create_data = {
      'create_data': [],
      'update_data': [],
      'delete_data': []
    };

    this.scheduleList.forEach((item, index) => {
      if (item.available.length > 0) {
        item.available.forEach((schedule) => {
          create_data.delete_data.push(schedule.id);
        });
      }
    });

    this.scheduleList.forEach((item, index) => {
      create_data.create_data.push({
        [this.scheduleList[index].utc]: newArr
      })
    });

    this.practitionerScheduleService.saveAvailablity(create_data).subscribe((success) => {
      this.modalService.dismissAll();
      this.router.navigate(['practitioner/schedule']);
    }, (err) => {
      console.log('err', err);
    })
  }
}
