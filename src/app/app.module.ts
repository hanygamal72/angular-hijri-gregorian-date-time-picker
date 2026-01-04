import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Required for ngModel

import { AppComponent } from './app.component';
import { HijriGregorianDatepickerModule } from 'projects/hijri-gregorian-datepicker/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Required for ngModel in demo
    HijriGregorianDatepickerModule,
    ReactiveFormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
