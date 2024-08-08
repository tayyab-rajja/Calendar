import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SmallCalendarComponent } from './small-calendar/small-calendar.component';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CalendarComponent,
    AppointmentFormComponent,
    SmallCalendarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    CalendarRoutingModule,
    MatCardModule,
    MatTooltipModule,
    MatOptionModule,
  ],
})
export class CalendarModule {}
