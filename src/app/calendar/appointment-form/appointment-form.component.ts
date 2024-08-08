import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment, AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment | { date: string },
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.appointmentForm.setValue({
      title: this.isEditingAppointment() ? (this.data as Appointment).title : '',
      date: this.isEditingAppointment()
        ? (this.data as Appointment).date
        : (this.data as { date: string }).date,
      startTime: this.isEditingAppointment()
        ? (this.data as Appointment).startTime
        : '',
      endTime: this.isEditingAppointment()
        ? (this.data as Appointment).endTime
        : '',
    });
  }

  public isEditingAppointment(): boolean {
    return (this.data as Appointment).id !== undefined;
  }

  handleSave(): void {
    if (this.appointmentForm.valid) {
      const result = {
        ...this.appointmentForm.value,
        id: this.isEditingAppointment()
          ? (this.data as Appointment).id
          : undefined,
      };
      this.dialogRef.close(result);
    }
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleDelete(): void {
    if (this.isEditingAppointment()) {
      this.appointmentService.deleteAppointment((this.data as Appointment).id);
      this.dialogRef.close();
    }
  }
}
