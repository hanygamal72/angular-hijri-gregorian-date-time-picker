import { Component } from '@angular/core';
import { DayInfo } from 'projects/hijri-gregorian-datepicker/src/_interfaces/calendar-model';
import { stylesConfig } from 'projects/hijri-gregorian-datepicker/src/_interfaces/styles-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggle: boolean = false;
  selectedDate: DayInfo;
  stylesConfig: stylesConfig = {
    backgroundColor: '#000',
    primaryColor: '#116466',
    secondaryColor: '#2c3531',
    todaysDateBgColor: '#116466',
    todaysDateTextColor: '#e3f4f4',
    confirmBtnTextColor: '#e3f4f4',
    disabledDayColor: '#a6a6a6',
    dayColor: '#2c3531',
    dayNameColor: '#116466',
    fontFamily: 'Default-Regular',
    borderRadius: '8px',
    // Time picker styles
    timePickerBgColor: '#ffffff',
    timePickerTextColor: '#2c3531',
    timePickerBorderColor: '#116466',
    timePickerArrowColor: '#116466',
    timePickerColonColor: '#116466',
    meridianBgColor: '#ffffff',
    meridianTextColor: '#2c3531',
    meridianActiveBgColor: '#116466',
    meridianActiveTextColor: '#e3f4f4',
  };
  mode = 'greg';

  // ==================================================
  // EXAMPLES: Initial Date Setup
  // ==================================================

  enableTime = true;
  minDate = new Date(2025, 0, 1); // Jan 1, 2025
  maxDate = new Date(2025, 11, 31); // Dec 31, 2025

  // FOR SINGLE SELECTION MODE:
  // Use initialDate to highlight one date
  initialDate = new Date(); // Today

  // FOR RANGE SELECTION MODE:
  // Use initialRangeStart and initialRangeEnd to highlight a range
  initialRangeStart = new Date(2025, 11, 10, 9, 0); // Dec 10, 2025 at 9:00 AM
  initialRangeEnd = new Date(2025, 11, 20, 17, 30); // Dec 20, 2025 at 5:30 PM

  // ==================================================

  constructor() {}

  onSubmit(ev: any) {
    console.log('📅 On Submit:', ev);

    // Range selection output
    if (ev.start && ev.end) {
      console.log('🎯 RANGE SELECTED:');
      console.log(
        '  📍 Start:',
        ev.start.gD,
        '(Gregorian)',
        ev.start.uD,
        '(Hijri)'
      );
      if (ev.start.time) {
        console.log(
          '  ⏰ Start Time:',
          `${ev.start.time.hour}:${ev.start.time.minute
            .toString()
            .padStart(2, '0')}`
        );
      }
      console.log('  📍 End:', ev.end.gD, '(Gregorian)', ev.end.uD, '(Hijri)');
      if (ev.end.time) {
        console.log(
          '  ⏰ End Time:',
          `${ev.end.time.hour}:${ev.end.time.minute
            .toString()
            .padStart(2, '0')}`
        );
      }
      return;
    }

    // Single date output
    if (ev.time) {
      console.log(
        '⏰ Time:',
        `${ev.time.hour}:${ev.time.minute.toString().padStart(2, '0')}`
      );
    }
    if (ev.gD) {
      console.log('📆 Gregorian:', ev.gD);
      console.log('🌙 Hijri:', ev.uD);
    }
  }

  onChange(eventData: any) {
    console.log('🔄 On Day Select:', eventData);

    // Range selection tracking
    if (eventData.start) {
      if (eventData.end) {
        console.log(
          '✅ Range Complete:',
          eventData.start.gD,
          '→',
          eventData.end.gD
        );
      } else {
        console.log(
          '⏳ Range Started:',
          eventData.start.gD,
          '(select end date)'
        );
      }
    }

    if (!Array.isArray(eventData)) {
      this.selectedDate = eventData;
    }
  }

  onMonthChangeTest(ev: any) {
    console.log('Month Changed: ', ev);
  }

  onYearChangeTest(ev: any) {
    console.log('Year Changed ', ev);
  }

  toggleMode() {
    this.mode = this.mode == 'greg' ? 'ummAlQura' : 'greg';
  }

  toggleTimePicker() {
    this.enableTime = !this.enableTime;
  }
}
