import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-small-calendar',
  templateUrl: './small-calendar.component.html',
  styleUrls: ['./small-calendar.component.scss'],
})
export class SmallCalendarComponent {
  selectedDate: Date = new Date();

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    console.log('Selected date:', event);
  }
}
