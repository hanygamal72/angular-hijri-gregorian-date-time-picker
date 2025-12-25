import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostBinding,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { stylesConfig } from '../_interfaces/styles-config.model';
import { DateUtilitiesService } from '../_services/date-utilities.service';
import { TodayDate, DayInfo } from '../_interfaces/calendar-model';
import * as themesConfig from '../themes/themes.json';
@Component({
  selector: 'hijri-gregorian-datepicker',
  templateUrl: './hijri-gregorian-datepicker.component.html',
  styleUrls: ['./hijri-gregorian-datepicker.component.scss'],
})
export class HijriGregorianDatepickerComponent implements OnInit, OnChanges, AfterViewInit {
  /// Inputs
  @Input() markToday: boolean = true;
  @Input() canChangeMode: boolean = true;
  @Input() todaysDateSection: boolean = true;
  @Input() futureValidation: boolean = true;
  @Input() disableYearPicker: boolean = false;
  @Input() disableMonthPicker: boolean = false;
  @Input() disableDayPicker: boolean = false;
  @Input() multiple: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() showConfirmButton: boolean = true;
  @Input() futureValidationMessage: boolean = false;
  @Input() arabicLayout: boolean = false;
  @Input() mode: string = 'greg';
  @Input() dir: string = 'ltr';
  @Input() locale: string = 'en';
  @Input() submitTextButton: string = 'Confirm';
  @Input() todaysDateText: string = "Today's Date";
  @Input() ummAlQuraDateText: string = 'Hijri Date';
  @Input() monthSelectLabel: string = 'Month';
  @Input() yearSelectLabel: string = 'Year';
  @Input() futureValidationMessageEn: string;
  @Input() futureValidationMessageAr: string;
  @Input() theme?: string = '';
  @Input() pastYearsLimit: number = 90;
  @Input() futureYearsLimit: number = 0;
  @Input() styles?: stylesConfig = {};

  // New inputs for extended functionality
  @Input() enableTime: boolean = false; // Enable time picker (hours & minutes)
  @Input() minDate?: Date | string; // Minimum allowed date (Gregorian Date or DD/MM/YYYY string)
  @Input() maxDate?: Date | string; // Maximum allowed date (Gregorian Date or DD/MM/YYYY string)
  @Input() initialDate?: Date | string; // Initial date to navigate to when picker opens
  
  // Range selection initial dates
  @Input() initialRangeStart?: Date | string; // Initial start date for range selection
  @Input() initialRangeEnd?: Date | string; // Initial end date for range selection
  
  // BACKWARD COMPATIBILITY: Default to false (24-hour format)
  // When true, displays 12-hour format with AM/PM toggle
  @Input() useMeridian: boolean = false; // Enable 12-hour format with AM/PM
  
  // BACKWARD COMPATIBILITY: Default to 'single' (existing behavior)
  // 'range' enables range selection mode (first click = start, second click = end)
  @Input() selectionMode: 'single' | 'range' = 'single';
  /// Outputs
  @Output() onSubmit = new EventEmitter<object>();
  @Output() onDaySelect = new EventEmitter<object>();
  @Output() onMonthChange = new EventEmitter<object>();
  @Output() onYearChange = new EventEmitter<object>();
  /// Variables
  ummAlQuraMonths = [
    { labelAr: 'محرم', labelEn: 'Muharram', value: 1 },
    { labelAr: 'صفر', labelEn: 'Safar', value: 2 },
    { labelAr: 'ربيع الأول', labelEn: 'Rabi al-Awwal', value: 3 },
    { labelAr: 'ربيع الثاني', labelEn: 'Rabi al-Thani', value: 4 },
    { labelAr: 'جمادى الأولى', labelEn: 'Jumada al-Awwal', value: 5 },
    { labelAr: 'جمادى الآخرة', labelEn: 'Jumada al-Thani', value: 6 },
    { labelAr: 'رجب', labelEn: 'Rajab', value: 7 },
    { labelAr: 'شعبان', labelEn: 'Shaban', value: 8 },
    { labelAr: 'رمضان', labelEn: 'Ramadan', value: 9 },
    { labelAr: 'شوال', labelEn: 'Shawwal', value: 10 },
    { labelAr: 'ذو القعدة', labelEn: 'Dhu al-Qadah', value: 11 },
    { labelAr: 'ذو الحجة', labelEn: 'Dhu al-Hijjah', value: 12 },
  ];
  gregMonths = [
    { labelAr: 'يناير', labelEn: 'January', value: 1 },
    { labelAr: 'فبراير', labelEn: 'February', value: 2 },
    { labelAr: 'مارس', labelEn: 'March', value: 3 },
    { labelAr: 'ابريل', labelEn: 'April', value: 4 },
    { labelAr: 'مايو', labelEn: 'May', value: 5 },
    { labelAr: 'يونيو', labelEn: 'June', value: 6 },
    { labelAr: 'يوليو', labelEn: 'July', value: 7 },
    { labelAr: 'اغسطس', labelEn: 'August', value: 8 },
    { labelAr: 'سبتمبر', labelEn: 'September', value: 9 },
    { labelAr: 'اكتوبر', labelEn: 'October', value: 10 },
    { labelAr: 'نوفمبر', labelEn: 'November', value: 11 },
    { labelAr: 'ديسمبر', labelEn: 'December', value: 12 },
  ];
  ummAlQuraYear: number;
  gregYear: number;
  years: any[];
  weeks: any[];
  months: any[];
  weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdaysAr = ['سبت', 'جمعة', 'خميس', 'أربعاء', 'ثلاثاء', 'اثنين', 'أحد'];
  // weekdaysAr = ['س', 'ج', 'خ', 'أر', 'ث', 'إث', 'أح'];
  todaysDate: TodayDate = {};
  selectedDay: DayInfo;
  periodForm: UntypedFormGroup;
  multipleSelectedDates = [] as DayInfo[];
  themes = [] as any;

  // Time picker variables
  // BACKWARD COMPATIBILITY: selectedTime defaults to 0:0 to preserve existing behavior when enableTime=false
  // When enableTime=true, this will be initialized to current system time in ngOnInit
  selectedTime: { hour: number; minute: number } = { hour: 0, minute: 0 };
  
  // Track if time has been initialized to avoid re-initializing at midnight
  private timeInitialized: boolean = false;
  
  // BACKWARD COMPATIBILITY: Meridian only used when useMeridian=true
  // Tracks AM/PM state for 12-hour format
  meridian: 'AM' | 'PM' = 'AM';
  
  // Range selection state
  // BACKWARD COMPATIBILITY: These are only used when selectionMode='range'
  // They do not affect single or multiple selection modes
  rangeStart?: DayInfo = undefined;
  rangeEnd?: DayInfo = undefined;

  @HostBinding('style.font-family') fontFamilyStyle: string;
  constructor(
    public formBuilder: UntypedFormBuilder,
    public _dateUtilsService: DateUtilitiesService
  ) {}

  ngOnInit(): void {
    this.initTheme();
    this.initializeForm();
    this.getTodaysDateInfo();
    this.initializeYearsAndMonths();

    // Initialize time from current system time or initialDate
    // BACKWARD COMPATIBILITY: This only runs when enableTime=true
    if (this.enableTime) {
      this.initializeTime();
    }
  }

  ngAfterViewInit(): void {
    // Double-check time initialization after view is ready
    // This handles cases where enableTime might be set after ngOnInit
    if (this.enableTime && !this.timeInitialized) {
      this.initializeTime();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['mode'].isFirstChange()) {
      this.changeCalendarMode();
    }
  }

  initTheme() {
    if (this.theme != '') {
      this.themes = themesConfig;
      for (const themeItem of this.themes['default']) {
        if (themeItem.name == this.theme) {
          this.styles = themeItem.stylesConfig;
          break;
        }
      }
    }
    this.fontFamilyStyle = this.styles.fontFamily;
  }

  /// Initialize form control for month and year select
  initializeForm() {
    this.periodForm = this.formBuilder.group({
      year: [{ value: '', disabled: this.disableYearPicker }, []],
      month: [{ value: '', disabled: this.disableMonthPicker }, []],
    });
  }

  // Initialize years and months for calendar
  initializeYearsAndMonths() {
    this.years = [];
    this.months = [];

    // Determine the date to use for initialization (initialDate or today)
    let referenceDate: string;
    if (this.initialDate) {
      const normalizedInitialDate =
        this._dateUtilsService.normalizeDateToString(this.initialDate);
      if (normalizedInitialDate) {
        if (this.mode == 'greg') {
          referenceDate = normalizedInitialDate;
        } else {
          const hijriDate = this._dateUtilsService.convertDate(
            normalizedInitialDate,
            true
          );
          referenceDate = hijriDate?.uD || this.todaysDate.ummAlQura;
        }
      } else {
        referenceDate =
          this.mode == 'greg'
            ? this.todaysDate.gregorian
            : this.todaysDate.ummAlQura;
      }
    } else {
      referenceDate =
        this.mode == 'greg'
          ? this.todaysDate.gregorian
          : this.todaysDate.ummAlQura;
    }

    if (this.mode == 'greg') {
      this.gregYear =
        this.futureYearsLimit == 0
          ? Number(referenceDate?.split('/')[2])
          : Number(referenceDate?.split('/')[2]) + this.futureYearsLimit;
      for (let i = 0; i < this.gregYear; i++) {
        if (i < this.pastYearsLimit) {
          let val = this.gregYear--;
          this.years.push(val);
        } else {
          break;
        }
      }
      this.months = this.gregMonths;
    } else {
      this.ummAlQuraYear =
        this.futureYearsLimit == 0
          ? Number(referenceDate?.split('/')[2])
          : Number(referenceDate?.split('/')[2]) + this.futureYearsLimit;
      for (let i = 0; i < this.ummAlQuraYear; i++) {
        if (i < this.pastYearsLimit) {
          let val = this.ummAlQuraYear--;
          this.years.push(val);
        } else {
          break;
        }
      }
      this.months = this.ummAlQuraMonths;
    }
    this.years.map((year: any) => {
      if (year == referenceDate?.split('/')[2]) {
        this.periodForm.controls['year'].setValue(year);
      }
    });
    this.months.map((month: any) => {
      if (month.value == referenceDate?.split('/')[1]) {
        this.periodForm.controls['month'].setValue(month.value);
      }
    });
  }

  /// On change event of years and months
  onPeriodChange(type: string) {
    if (type == 'year') {
      this.onYearChange.emit(this.periodForm.controls['year'].value);
    } else {
      this.onMonthChange.emit(this.periodForm.controls['month'].value);
    }
    const days = this._dateUtilsService.getMonthData(
      '01/' +
        this.periodForm.controls['month'].value +
        '/' +
        this.periodForm.controls['year'].value,
      this.mode
    );
    this.weeks = this.generateWeeksArray(days);
  }

  /// Get todays(greg and umm al qura) date info
  getTodaysDateInfo() {
    this.todaysDate.gregorian = this._dateUtilsService.formatDate(new Date());
    this.todaysDate.ummAlQura = this._dateUtilsService.convertDate(
      this.todaysDate.gregorian,
      true
    )?.uD;

    // Use initialDate if provided, otherwise use today's date
    let dateToNavigate: string;

    if (this.initialDate) {
      // Normalize initialDate to DD/MM/YYYY format
      const normalizedInitialDate =
        this._dateUtilsService.normalizeDateToString(this.initialDate);

      if (normalizedInitialDate) {
        if (this.mode == 'greg') {
          dateToNavigate = normalizedInitialDate;
        } else {
          // Convert to Hijri for ummAlQura mode
          const hijriDate = this._dateUtilsService.convertDate(
            normalizedInitialDate,
            true
          );
          dateToNavigate = hijriDate?.uD || this.todaysDate.ummAlQura;
        }
      } else {
        // Invalid initialDate, fall back to today
        dateToNavigate =
          this.mode == 'greg'
            ? this.todaysDate.gregorian
            : this.todaysDate.ummAlQura;
      }
    } else {
      // No initialDate provided, use today
      dateToNavigate =
        this.mode == 'greg'
          ? this.todaysDate.gregorian
          : this.todaysDate.ummAlQura;
    }

    this.generatetMonthData(dateToNavigate);
    
    // Highlight initialDate or initialRange if provided
    if (this.selectionMode === 'range' && (this.initialRangeStart || this.initialRangeEnd)) {
      this.highlightInitialRange();
    } else if (this.initialDate) {
      this.highlightInitialDate();
    }
  }

  /// Generate month days from JSON
  generatetMonthData(date: string) {
    const days = this._dateUtilsService.getMonthData(date, this.mode);
    this.weeks = this.generateWeeksArray(days);
  }

  /// Highlight initialDate on the calendar
  private highlightInitialDate() {
    if (!this.initialDate) {
      return;
    }

    const normalizedInitialDate =
      this._dateUtilsService.normalizeDateToString(this.initialDate);

    if (!normalizedInitialDate) {
      return;
    }

    // Find the day in the weeks array that matches initialDate
    for (const week of this.weeks) {
      for (const day of week) {
        if (day && day.gD === normalizedInitialDate) {
          // Don't select if date is disabled
          if (!this.isDateDisabled(day)) {
            // Mark as selected without triggering events
            day.selected = true;
            
            // Set as selectedDay based on selection mode
            if (this.selectionMode === 'range') {
              this.rangeStart = day;
            } else if (this.multiple) {
              this.multipleSelectedDates = [day];
            } else {
              this.selectedDay = day;
            }
            
            // Initialize time if enableTime is active
            if (this.enableTime && !this.timeInitialized) {
              this.initializeTime();
            }
            
            // Attach time to the day if it's a Date object with time
            if (this.enableTime && this.initialDate instanceof Date) {
              day.time = {
                hour: this.initialDate.getHours(),
                minute: this.initialDate.getMinutes()
              };
            }
          }
          return;
        }
      }
    }
  }

  /// Highlight initial range (start and end dates) on the calendar
  private highlightInitialRange() {
    if (!this.initialRangeStart && !this.initialRangeEnd) {
      return;
    }

    const normalizedStartDate = this.initialRangeStart
      ? this._dateUtilsService.normalizeDateToString(this.initialRangeStart)
      : null;
    const normalizedEndDate = this.initialRangeEnd
      ? this._dateUtilsService.normalizeDateToString(this.initialRangeEnd)
      : null;

    let startDay: DayInfo | null = null;
    let endDay: DayInfo | null = null;

    // Find both start and end dates in the weeks array
    for (const week of this.weeks) {
      for (const day of week) {
        if (day && normalizedStartDate && day.gD === normalizedStartDate) {
          if (!this.isDateDisabled(day)) {
            startDay = day;
          }
        }
        if (day && normalizedEndDate && day.gD === normalizedEndDate) {
          if (!this.isDateDisabled(day)) {
            endDay = day;
          }
        }
      }
    }

    // Set range start
    if (startDay) {
      startDay.selected = true;
      this.rangeStart = startDay;
      this.selectedDay = startDay;
      
      // Initialize and attach time to start date
      if (this.enableTime) {
        if (!this.timeInitialized) {
          this.initializeTime();
        }
        if (this.initialRangeStart instanceof Date) {
          startDay.time = {
            hour: this.initialRangeStart.getHours(),
            minute: this.initialRangeStart.getMinutes()
          };
        } else {
          startDay.time = { ...this.selectedTime };
        }
      }
    }

    // Set range end if provided
    if (endDay && startDay) {
      // Swap if end is before start
      const startDate = this.parseDateString(startDay.gD);
      const endDate = this.parseDateString(endDay.gD);
      
      if (endDate && startDate && endDate < startDate) {
        // Swap
        this.rangeEnd = startDay;
        this.rangeStart = endDay;
        endDay.selected = true;
      } else {
        this.rangeEnd = endDay;
      }
      
      // Attach time to end date (inherit from start)
      if (this.enableTime) {
        const timeToUse = this.rangeStart.time || { ...this.selectedTime };
        if (this.initialRangeEnd instanceof Date) {
          this.rangeEnd.time = {
            hour: this.initialRangeEnd.getHours(),
            minute: this.initialRangeEnd.getMinutes()
          };
        } else {
          this.rangeEnd.time = { ...timeToUse };
        }
        // Ensure start also has time
        this.rangeStart.time = { ...timeToUse };
      }
      
      // Highlight the range
      this.highlightRange();
      this.selectedDay = this.rangeEnd;
    }
  }

  /// Generate month weeks
  generateWeeksArray(daysArray: any) {
    const firstDayName = daysArray[0]?.dN;
    const startIndex = this.weekdaysEn.indexOf(firstDayName);
    const weeks = [[]] as any;
    let currentWeek = 0;
    let currentDayIndex = startIndex;

    daysArray?.forEach((day: any) => {
      if (!weeks[currentWeek]) {
        weeks[currentWeek] = [];
      }

      weeks[currentWeek][currentDayIndex] = day;
      currentDayIndex++;

      if (currentDayIndex === 7) {
        currentDayIndex = 0;
        currentWeek++;
      }
    });
    weeks.forEach((week: any) => {
      while (week.length < 7) {
        week.push({});
      }
    });
    return weeks;
  }

  /// Change calendar mode 'greg' or 'ummAlQura'
  changeCalendarMode() {
    this.mode = this.mode == 'greg' ? 'ummAlQura' : 'greg';
    this.initializeYearsAndMonths();
    this.generatetMonthData(
      '01/' +
        this.periodForm.controls['month'].value +
        '/' +
        this.periodForm.controls['year'].value
    );
  }

  /// On day clicked handler
  onDayClicked(day: DayInfo) {
    if (day && day?.gD) {
      // Check if day is disabled by min/max constraints
      if (this.isDateDisabled(day)) {
        return; // Don't allow selection of disabled dates
      }

      if (this.futureValidation) {
        if (this.checkFutureValidation(day)) {
          this.futureValidationMessage = true;
        } else {
          this.futureValidationMessage = false;
          this.markDaySelected(day);
        }
      } else {
        this.markDaySelected(day);
      }
    }
  }

  /// Mark day as selected
  markDaySelected(dayInfo: DayInfo) {
    // BACKWARD COMPATIBILITY: Range selection only when selectionMode='range'
    if (this.selectionMode === 'range') {
      this.handleRangeSelection(dayInfo);
      return;
    }
    
    // BACKWARD COMPATIBILITY: Original behavior for single/multiple selection
    if (dayInfo.selected) {
      dayInfo.selected = false;
      this.multipleSelectedDates = this.multipleSelectedDates.filter(
        (day) => day !== dayInfo
      );
      if (!this.multiple) {
        this.selectedDay = undefined;
      }
    } else {
      if (!this.multiple) {
        this.weeks.forEach((week: any) => {
          week.forEach((day: DayInfo) => {
            day.selected = false;
          });
        });

        dayInfo.selected = true;
        this.selectedDay = dayInfo;
        this.multipleSelectedDates = [dayInfo];

        // Attach current time if enableTime is active
        if (this.enableTime) {
          // Ensure time is initialized before attaching
          if (!this.timeInitialized) {
            this.initializeTime();
          }
          dayInfo.time = { ...this.selectedTime };
        }

        this.onDaySelect.emit(dayInfo);
      } else {
        dayInfo.selected = true;

        // Attach current time if enableTime is active
        if (this.enableTime) {
          // Ensure time is initialized before attaching
          if (!this.timeInitialized) {
            this.initializeTime();
          }
          dayInfo.time = { ...this.selectedTime };
        }

        this.onDaySelect.emit(dayInfo);
        if (!this.multipleSelectedDates.includes(dayInfo)) {
          this.multipleSelectedDates.push(dayInfo);
        }
      }
    }
  }

  /**
   * Handle range selection logic
   * BACKWARD COMPATIBILITY: Only called when selectionMode='range'
   * 
   * Range selection lifecycle:
   * 1. First click → Sets rangeStart
   * 2. Second click → Sets rangeEnd, highlights range
   * 3. Third click → Resets range, starts new selection
   */
  private handleRangeSelection(dayInfo: DayInfo): void {
    // First click or resetting range
    if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
      this.resetRange();
      this.rangeStart = dayInfo;
      dayInfo.selected = true;
      this.selectedDay = dayInfo;
      
      // Attach current time if enableTime is active
      if (this.enableTime) {
        // Ensure selectedTime is initialized
        // If time hasn't been initialized yet, initialize it now
        if (!this.timeInitialized) {
          this.initializeTime();
        }
        dayInfo.time = { ...this.selectedTime };
      }
      
      this.onDaySelect.emit({ start: dayInfo, end: null });
    }
    // Second click - complete the range
    else if (this.rangeStart && !this.rangeEnd) {
      const startDate = this.parseDateString(this.rangeStart.gD);
      const endDate = this.parseDateString(dayInfo.gD);
      
      // Swap if end is before start
      if (endDate && startDate && endDate < startDate) {
        this.rangeEnd = this.rangeStart;
        this.rangeStart = dayInfo;
      } else {
        this.rangeEnd = dayInfo;
      }
      
      // Attach time if enableTime is active
      // IMPORTANT: Range end inherits time from range start (not current selectedTime)
      if (this.enableTime) {
        // Use rangeStart's time if it exists, otherwise use current selectedTime
        const timeToUse = this.rangeStart.time || { ...this.selectedTime };
        this.rangeStart.time = { ...timeToUse };
        this.rangeEnd.time = { ...timeToUse };
      }
      
      this.highlightRange();
      this.selectedDay = this.rangeEnd;
      
      this.onDaySelect.emit({ start: this.rangeStart, end: this.rangeEnd });
    }
  }

  /// On confirm button clicked
  onConfirmClicked() {
    // BACKWARD COMPATIBILITY: Range selection output when selectionMode='range'
    if (this.selectionMode === 'range') {
      if (this.rangeStart && this.rangeEnd) {
        // Collect all dates in range
        const rangeDates: DayInfo[] = [];
        this.weeks.forEach((week: any) => {
          week.forEach((day: DayInfo) => {
            if (day && day.gD && (this.isInRange(day) || this.isRangeStart(day) || this.isRangeEnd(day))) {
              // Attach current time if enableTime is active
              if (this.enableTime && !day.time) {
                day.time = { ...this.selectedTime };
              }
              rangeDates.push(day);
            }
          });
        });
        
        this.onSubmit.emit({ 
          start: this.rangeStart, 
          end: this.rangeEnd,
          dates: rangeDates 
        });
      } else {
        // Incomplete range
        this.onSubmit.emit({ start: this.rangeStart, end: null, dates: [] });
      }
      return;
    }
    
    // BACKWARD COMPATIBILITY: Original behavior for multiple/single selection
    if (this.multiple) {
      // For multiple dates, attach time to each if enableTime is active
      if (this.enableTime) {
        this.multipleSelectedDates.forEach((day) => {
          if (!day.time) {
            day.time = { ...this.selectedTime };
          }
        });
      }
      this.onSubmit.emit(this.multipleSelectedDates);
    } else {
      // For single date, attach time if enableTime is active
      if (this.enableTime && this.selectedDay) {
        this.selectedDay.time = { ...this.selectedTime };
      }
      this.onSubmit.emit(this.selectedDay);
    }
  }

  /// Check if date from future
  checkFutureValidation(day: DayInfo) {
    if (
      this._dateUtilsService.checkPastOrFuture(day?.gD, new Date()) == 'Future'
    ) {
      return true;
    }
  }

  /// Check if passed day is today or not
  checkTodaysDate(day: DayInfo) {
    return (
      this.todaysDate?.gregorian == day?.gD ||
      this.todaysDate?.ummAlQura == day?.uD
    );
  }

  /**
   * Check if a day is disabled based on min/max date constraints
   * Works for both Gregorian and Hijri modes
   */
  isDateDisabled(day: DayInfo): boolean {
    if (!day || !day.gD) return true;

    // Normalize min/max dates to Gregorian DD/MM/YYYY format
    const minDateStr = this.minDate
      ? this._dateUtilsService.normalizeDateToString(this.minDate)
      : null;
    const maxDateStr = this.maxDate
      ? this._dateUtilsService.normalizeDateToString(this.maxDate)
      : null;

    // Check if the day's Gregorian date is within range
    return !this._dateUtilsService.isDateInRange(
      day.gD,
      minDateStr,
      maxDateStr
    );
  }

  /**
   * Initialize time from current system time or initialDate
   * BACKWARD COMPATIBILITY: Only called when enableTime=true
   *
   * Priority:
   * 1. If initialDate has time, use that
   * 2. If selectedDay has time, use that
   * 3. Otherwise, use current system time
   */
  initializeTime(): void {
    let timeSet = false;

    // Check if initialDate has time information
    if (this.initialDate && this.initialDate instanceof Date) {
      this.selectedTime = {
        hour: this.initialDate.getHours(),
        minute: this.initialDate.getMinutes(),
      };
      timeSet = true;
    }

    // If no time from initialDate, use current system time
    if (!timeSet) {
      const now = new Date();
      this.selectedTime = {
        hour: now.getHours(),
        minute: now.getMinutes(),
      };
    }
    
    // Mark that time has been initialized
    this.timeInitialized = true;
    
    // BACKWARD COMPATIBILITY: Only set meridian when useMeridian=true
    if (this.useMeridian) {
      this.meridian = this.selectedTime.hour >= 12 ? 'PM' : 'AM';
    }
  }

  /**
   * Increment hour value with wraparound (0-23)
   * BACKWARD COMPATIBILITY: Only available when enableTime=true
   */
  incrementHour(): void {
    this.selectedTime.hour = (this.selectedTime.hour + 1) % 24;
    this.updateSelectedDayTime();
  }

  /**
   * Decrement hour value with wraparound (0-23)
   * BACKWARD COMPATIBILITY: Only available when enableTime=true
   */
  decrementHour(): void {
    this.selectedTime.hour = (this.selectedTime.hour - 1 + 24) % 24;
    this.updateSelectedDayTime();
  }

  /**
   * Increment minute value with wraparound (0-59)
   * BACKWARD COMPATIBILITY: Only available when enableTime=true
   */
  incrementMinute(): void {
    this.selectedTime.minute = (this.selectedTime.minute + 1) % 60;
    this.updateSelectedDayTime();
  }

  /**
   * Decrement minute value with wraparound (0-59)
   * BACKWARD COMPATIBILITY: Only available when enableTime=true
   */
  decrementMinute(): void {
    this.selectedTime.minute = (this.selectedTime.minute - 1 + 60) % 60;
    this.updateSelectedDayTime();
  }

  /**
   * Handle keyboard input for hours
   * Validates and clamps to 0-23 range
   * BACKWARD COMPATIBILITY: Only available when enableTime=true
   */
  onHourInputChange(event: any): void {
    let value = parseInt(event.target.value, 10);

    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 23) {
      value = 23;
    }

    this.selectedTime.hour = value;
    event.target.value = value;
    this.updateSelectedDayTime();
  }

  /**
   * Handle keyboard input for minutes
   * Validates and clamps to 0-59 range
   * BACKWARD COMPATIBILITY: Only available when enableTime=true
   */
  onMinuteInputChange(event: any): void {
    let value = parseInt(event.target.value, 10);

    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 59) {
      value = 59;
    }

    this.selectedTime.minute = value;
    event.target.value = value;
    this.updateSelectedDayTime();
  }

  /**
   * Handle keyboard arrow keys for hour/minute input
   * BACKWARD COMPATIBILITY: Only available when enableTime=true
   */
  onTimeKeydown(event: KeyboardEvent, type: 'hour' | 'minute'): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (type === 'hour') {
        this.incrementHour();
      } else {
        this.incrementMinute();
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (type === 'hour') {
        this.decrementHour();
      } else {
        this.decrementMinute();
      }
    }
  }

  /**
   * Update the selected day's time property when time changes
   * BACKWARD COMPATIBILITY: Only called when enableTime=true
   */
  private updateSelectedDayTime(): void {
    if (this.selectedDay) {
      this.selectedDay.time = { ...this.selectedTime };
    }
  }

  /**
   * Get display hour for 12-hour format
   * BACKWARD COMPATIBILITY: Only used when useMeridian=true
   * 
   * Conversion:
   * - 0 (midnight) → 12 AM
   * - 1-11 (AM) → 1-11 AM
   * - 12 (noon) → 12 PM
   * - 13-23 (PM) → 1-11 PM
   * 
   * IMPORTANT: Hour 0 is NEVER displayed as 0, always as 12
   */
  getDisplayHour(): number {
    if (!this.useMeridian) {
      return this.selectedTime.hour;
    }
    
    const hour = this.selectedTime.hour;
    
    // Midnight (0) → 12
    if (hour === 0) {
      return 12;
    }
    // 1-12 → 1-12 (no change)
    else if (hour <= 12) {
      return hour;
    }
    // 13-23 → 1-11 (subtract 12)
    else {
      return hour - 12;
    }
  }

  /**
   * Toggle AM/PM meridian
   * BACKWARD COMPATIBILITY: Only available when useMeridian=true
   * 
   * When toggling:
   * - Adds or subtracts 12 hours
   * - Maintains internal 24-hour format
   */
  toggleMeridian(): void {
    if (this.meridian === 'AM') {
      this.meridian = 'PM';
      // Add 12 hours if not already in PM range
      if (this.selectedTime.hour < 12) {
        this.selectedTime.hour += 12;
      }
    } else {
      this.meridian = 'AM';
      // Subtract 12 hours if in PM range
      if (this.selectedTime.hour >= 12) {
        this.selectedTime.hour -= 12;
      }
    }
    this.updateSelectedDayTime();
  }

  /**
   * Increment hour in 12-hour mode
   * BACKWARD COMPATIBILITY: Only used when useMeridian=true
   */
  incrementHour12(): void {
    let displayHour = this.getDisplayHour();
    displayHour = (displayHour % 12) + 1; // 1-12 cycle
    
    // Convert back to 24-hour format
    if (this.meridian === 'AM') {
      this.selectedTime.hour = displayHour === 12 ? 0 : displayHour;
    } else {
      this.selectedTime.hour = displayHour === 12 ? 12 : displayHour + 12;
    }
    
    this.updateSelectedDayTime();
  }

  /**
   * Decrement hour in 12-hour mode
   * BACKWARD COMPATIBILITY: Only used when useMeridian=true
   */
  decrementHour12(): void {
    let displayHour = this.getDisplayHour();
    displayHour = displayHour === 1 ? 12 : displayHour - 1; // 1-12 cycle
    
    // Convert back to 24-hour format
    if (this.meridian === 'AM') {
      this.selectedTime.hour = displayHour === 12 ? 0 : displayHour;
    } else {
      this.selectedTime.hour = displayHour === 12 ? 12 : displayHour + 12;
    }
    
    this.updateSelectedDayTime();
  }

  /**
   * Handle 12-hour input change
   * BACKWARD COMPATIBILITY: Only used when useMeridian=true
   * 
   * IMPORTANT: Input must be 1-12, never 0
   * - User types 0 → converted to 12
   * - User types > 12 → clamped to 12
   */
  onHour12InputChange(event: any): void {
    let value = parseInt(event.target.value, 10);
    
    // Validate 1-12 range (0 is not allowed in 12-hour format)
    if (isNaN(value) || value < 1 || value === 0) {
      value = 12; // Default to 12 if invalid or 0
    } else if (value > 12) {
      value = 12;
    }
    
    // Convert to 24-hour format
    if (this.meridian === 'AM') {
      this.selectedTime.hour = value === 12 ? 0 : value;
    } else {
      this.selectedTime.hour = value === 12 ? 12 : value + 12;
    }
    
    event.target.value = value;
    this.updateSelectedDayTime();
  }

  /**
   * Check if a date is within the current range
   * BACKWARD COMPATIBILITY: Only used when selectionMode='range'
   */
  isInRange(day: DayInfo): boolean {
    if (this.selectionMode !== 'range' || !this.rangeStart || !this.rangeEnd || !day?.gD) {
      return false;
    }
    
    const dayDate = this.parseDateString(day.gD);
    const startDate = this.parseDateString(this.rangeStart.gD);
    const endDate = this.parseDateString(this.rangeEnd.gD);
    
    if (!dayDate || !startDate || !endDate) {
      return false;
    }
    
    return dayDate >= startDate && dayDate <= endDate;
  }

  /**
   * Check if a date is the range start
   * BACKWARD COMPATIBILITY: Only used when selectionMode='range'
   */
  isRangeStart(day: DayInfo): boolean {
    return this.selectionMode === 'range' && 
           this.rangeStart?.gD === day?.gD;
  }

  /**
   * Check if a date is the range end
   * BACKWARD COMPATIBILITY: Only used when selectionMode='range'
   */
  isRangeEnd(day: DayInfo): boolean {
    return this.selectionMode === 'range' && 
           this.rangeEnd?.gD === day?.gD;
  }

  /**
   * Reset range selection
   * BACKWARD COMPATIBILITY: Only used when selectionMode='range'
   */
  private resetRange(): void {
    if (this.selectionMode !== 'range') {
      return;
    }
    
    // Clear range highlighting
    this.weeks.forEach((week: any) => {
      week.forEach((day: DayInfo) => {
        if (day && day.gD) {
          day.selected = false;
        }
      });
    });
    
    this.rangeStart = undefined;
    this.rangeEnd = undefined;
    this.selectedDay = undefined;
  }

  /**
   * Parse date string (DD/MM/YYYY) to Date object
   * Helper for range comparison
   */
  private parseDateString(dateStr: string): Date | null {
    if (!dateStr) return null;
    
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    
    return new Date(year, month, day);
  }

  /**
   * Highlight all dates in range
   * BACKWARD COMPATIBILITY: Only used when selectionMode='range'
   */
  private highlightRange(): void {
    if (this.selectionMode !== 'range' || !this.rangeStart || !this.rangeEnd) {
      return;
    }
    
    this.weeks.forEach((week: any) => {
      week.forEach((day: DayInfo) => {
        if (day && day.gD) {
          day.selected = this.isInRange(day) || 
                        this.isRangeStart(day) || 
                        this.isRangeEnd(day);
        }
      });
    });
  }
}
