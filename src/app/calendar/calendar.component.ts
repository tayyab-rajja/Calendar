import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AppointmentService, Appointment } from './appointment.service';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  daysOfWeek: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  daysInMonth: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
  appointmentsByDay$: Observable<{ [key: number]: Appointment[] }> = of({});
  connectedTo: string[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.appointmentsByDay$ = this.appointmentService
      .getAppointments()
      .pipe(map((appointments) => this.organizeAppointmentsByDay(appointments)));

    this.connectedTo = this.daysInMonth.map((day) => `day-${day}`);
  }


  handleAppointmentDrop(event: CdkDragDrop<Appointment[]>, day: number): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const appointment = event.container.data[event.currentIndex];
      const newDate = new Date(appointment.date);
      newDate.setDate(day);
      appointment.date = newDate.toISOString();

      this.appointmentService.updateAppointment(appointment);
    }
  }

  organizeAppointmentsByDay(appointments: Appointment[]): {
    [key: number]: Appointment[];
  } {
    const grouped: { [key: number]: Appointment[] } = {};
    appointments.forEach((appointment) => {
      const day = new Date(appointment.date).getDate();
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(appointment);
    });
    return grouped;
  }

  displayAppointmentDetails(event: Event, appointment: Appointment): void {
    event.stopPropagation();
    console.log(appointment);
    this.dialog
      .open(AppointmentFormComponent, {
        data: appointment,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.appointmentService.updateAppointment(result);
        }
      });
  }


  formatTimeToAMPM(time: string): string {
    const [hour, minute] = time.split(':');
    const period = +hour >= 12 ? 'PM' : 'AM';
    const formattedHour = +hour % 12 || 12;
    return `${this.padZero(formattedHour)}:${minute} ${period}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


  generateTooltipText(appointment: Appointment): string {
    return `Title: ${appointment.title}\nDate: ${new Date(
      appointment.date
    ).toLocaleString()}\nTime: ${this.formatTimeToAMPM(
      appointment.startTime
    )} - ${this.formatTimeToAMPM(appointment.endTime)}`;
  }

  showAppointmentForm(day?: number): void {
    const date = day
      ? new Date(new Date().setDate(day)).toISOString()
      : new Date().toISOString();
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: { date },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.appointmentService.updateAppointment(result);
        } else {
          this.appointmentService.addAppointment(result);
        }
      }
    });
  }
}
