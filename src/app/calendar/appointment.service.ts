import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Appointment {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$: Observable<Appointment[]> =
    this.appointmentsSubject.asObservable();

  constructor() {
    const initialAppointments: Appointment[] = [];
    this.appointmentsSubject.next(initialAppointments);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.appointments$;
  }

  addAppointment(appointment: Appointment): void {
    const newId = this.appointmentsSubject.value.length
      ? Math.max(...this.appointmentsSubject.value.map((a) => a.id)) + 1
      : 1;

    if (!appointment.id) {
      appointment.id = newId;
    }

    const currentAppointments = this.appointmentsSubject.value;
    this.appointmentsSubject.next([...currentAppointments, appointment]);
  }

  updateAppointment(updatedAppointment: Appointment): void {
    const currentAppointments = this.appointmentsSubject.value;
    const index = currentAppointments.findIndex(
      (app) => app.id === updatedAppointment.id
    );
    if (index !== -1) {
      currentAppointments[index] = updatedAppointment;
      this.appointmentsSubject.next([...currentAppointments]);
    }
  }

  deleteAppointment(id: number): void {
    const currentAppointments = this.appointmentsSubject.value;
    const updatedAppointments = currentAppointments.filter(
      (appointment) => appointment.id !== id
    );
    this.appointmentsSubject.next(updatedAppointments);
  }
}
