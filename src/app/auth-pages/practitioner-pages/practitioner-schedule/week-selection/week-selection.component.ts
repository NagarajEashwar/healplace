import {Component, EventEmitter, Output} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-week-selection',
  templateUrl: './week-selection.component.html',
  styleUrls: ['./week-selection.component.scss']
})
export class WeekSelectionComponent {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  @Output() weekRange = new EventEmitter<any>();

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    let fromDate=new Date();
    let time=fromDate.getDay()?fromDate.getDay()-1:6
    fromDate=new Date(fromDate.getTime()-time*24*60*60*1000)
    this.fromDate=new NgbDate(fromDate.getFullYear(),fromDate.getMonth()+1,fromDate.getDate());
    const toDate=new Date(fromDate.getTime()+6*24*60*60*1000)
    this.toDate=new NgbDate(toDate.getFullYear(),toDate.getMonth()+1,toDate.getDate())

  }

  onDateSelection(date: NgbDate) {
    let fromDate=new Date(date.year+'-'+date.month+'-'+date.day)
    let time=fromDate.getDay()?fromDate.getDay()-1:6
    fromDate=new Date(fromDate.getTime()-time*24*60*60*1000)
    this.fromDate=new NgbDate(fromDate.getFullYear(),fromDate.getMonth()+1,fromDate.getDate());
    const toDate=new Date(fromDate.getTime()+6*24*60*60*1000)
    this.toDate=new NgbDate(toDate.getFullYear(),toDate.getMonth()+1,toDate.getDate())
    this.weekRange.emit({startdate: new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day), enddate: new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day)});
   }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}




