import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'bookTime'
})

export class BookTimePipe implements PipeTransform {
  transform(value: number): string {
     if(value > 0 && value/60 < 1) {
       return value + ' min';

     } else {
       return value/60 + ' hour';
     }
  }
}