import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material/core';

import { DateRangeComponent } from './date-range/date-range.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [DateRangeComponent],
  exports: [DateRangeComponent]
})
export class SharedUiDateRangeModule {}
