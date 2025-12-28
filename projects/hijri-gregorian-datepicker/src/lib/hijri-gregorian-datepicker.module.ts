import { NgModule } from '@angular/core';
import { HijriGregorianDatepickerComponent } from './hijri-gregorian-datepicker.component';
import { HijriGregorianDatetimeInputComponent } from './hijri-gregorian-datetime-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HijriGregorianDatepickerComponent,
    HijriGregorianDatetimeInputComponent, // NEW: DateTime input component
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [
    HijriGregorianDatepickerComponent,
    HijriGregorianDatetimeInputComponent, // NEW: Export for external use
  ],
})
export class HijriGregorianDatepickerModule {}
