/**
 * DateTime Input Component
 *
 * A reusable input field with dropdown calendar picker.
 * This component wraps the existing hijri-gregorian-datepicker component
 * and provides form integration via ControlValueAccessor.
 *
 * Features:
 * - Input field that opens dropdown on click
 * - Integrates with Reactive and Template-driven forms
 * - Configurable date/time formats
 * - Min/Max date constraints
 * - Confirm/Cancel actions
 * - Click-outside to close
 * - Accessibility support (keyboard)
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DayInfo } from '../_interfaces/calendar-model';
import { stylesConfig } from '../_interfaces/styles-config.model';
import { HijriGregorianDatepickerComponent } from './hijri-gregorian-datepicker.component';

@Component({
  standalone: false,
  selector: 'hijri-gregorian-datetime-input',
  templateUrl: './hijri-gregorian-datetime-input.component.html',
  styleUrls: ['./hijri-gregorian-datetime-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HijriGregorianDatetimeInputComponent),
      multi: true,
    },
  ],
})
export class HijriGregorianDatetimeInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  // ============================================================
  // CONFIGURATION INPUTS
  // ============================================================

  /** Placeholder text for input field */
  @Input() placeholder: string = 'Select date and time';

  /** Date format for display (e.g., 'DD/MM/YYYY') */
  @Input() dateFormat: string = 'DD/MM/YYYY';

  /** Time format for display (e.g., 'HH:mm' or 'hh:mm A') */
  @Input() timeFormat: string = 'HH:mm';

  /** Enable/disable the input */
  @Input() disabled: boolean = false;

  /** Enable time picker in the calendar */
  @Input() enableTime: boolean = false;

  /** Minimum allowed date (Date object or DD/MM/YYYY string) */
  @Input() minDate?: Date | string;

  /** Maximum allowed date (Date object or DD/MM/YYYY string) */
  @Input() maxDate?: Date | string;

  /** Initial date to display when opening calendar */
  @Input() initialDate?: Date | string;

  /** Calendar mode: 'greg' (Gregorian) or 'ummAlQura' (Hijri) */
  @Input() mode: string = 'greg';

  /** Internal mode that persists between open/close */
  currentMode: string = 'greg';

  /** Locale: 'en' or 'ar' */
  @Input() locale: string = 'en';

  /** Layout direction: 'ltr' or 'rtl' */
  @Input() dir: string = 'ltr';

  /** Show confirm button in calendar */
  @Input() showConfirmButton: boolean = true;

  /** Confirm button text */
  @Input() submitTextButton: string = 'Confirm';

  /** Theme name for calendar styling */
  @Input() theme?: string = '';

  /** Allow future dates */
  @Input() futureValidation: boolean = true;

  /** Mark today's date */
  @Input() markToday: boolean = true;

  /** Show today's date section */
  @Input() todaysDateSection: boolean = true;

  /** Enable 12-hour format with AM/PM */
  @Input() useMeridian: boolean = false;

  /** Selection mode: 'single' or 'range' */
  @Input() selectionMode: 'single' | 'range' = 'single';

  /** Custom CSS class for input field */
  @Input() inputClass: string = '';

  /** Custom CSS class for dropdown panel */
  @Input() dropdownClass: string = '';

  /** Custom styles configuration for calendar */
  @Input() styles?: stylesConfig = {};

  /** Text label for today's date section */
  @Input() todaysDateText: string = "Today's Date";

  /** Text label for Hijri date section */
  @Input() ummAlQuraDateText: string = 'Hijri Date';

  /** Label for AM in 12-hour format */
  @Input() amLabel: string = 'AM';

  /** Label for PM in 12-hour format */
  @Input() pmLabel: string = 'PM';

  // ============================================================
  // OUTPUTS
  // ============================================================

  /** Emitted when date is selected and confirmed */
  @Output() dateSelected = new EventEmitter<DayInfo | DayInfo[]>();

  /** Emitted when dropdown opens */
  @Output() dropdownOpened = new EventEmitter<void>();

  /** Emitted when dropdown closes */
  @Output() dropdownClosed = new EventEmitter<void>();

  // ============================================================
  // INTERNAL STATE
  // ============================================================

  /** Whether dropdown is currently open */
  isDropdownOpen: boolean = false;

  /** Current displayed value in input field */
  displayValue: string = '';

  /** Current selected date/time value */
  currentValue: DayInfo | DayInfo[] | null = null;

  /** Reference to the input element */
  @ViewChild('inputElement', { static: false })
  inputElement!: ElementRef<HTMLInputElement>;

  /** Reference to the dropdown container */
  @ViewChild('dropdownContainer', { static: false })
  dropdownContainer!: ElementRef<HTMLDivElement>;

  /** Reference to the calendar component */
  @ViewChild(HijriGregorianDatepickerComponent, { static: false })
  calendarComponent?: HijriGregorianDatepickerComponent;

  // ControlValueAccessor callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // ============================================================
  // LIFECYCLE HOOKS
  // ============================================================

  ngOnInit(): void {
    // Initialize current mode from input
    this.currentMode = this.mode;
    
    // Initialize with initialDate if provided
    if (this.initialDate) {
      this.initializeWithDate(this.initialDate);
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // ============================================================
  // CONTROL VALUE ACCESSOR IMPLEMENTATION
  // ============================================================

  /**
   * Write a new value to the element (from form control)
   */
  writeValue(value: any): void {
    if (value) {
      this.currentValue = value;
      this.updateDisplayValue(value);
    } else {
      this.currentValue = null;
      this.displayValue = '';
    }
  }

  /**
   * Register callback for value changes
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Register callback for touch events
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Set the disabled state
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ============================================================
  // DROPDOWN MANAGEMENT
  // ============================================================

  /**
   * Toggle dropdown open/close
   */
  toggleDropdown(): void {
    if (this.disabled) return;

    if (this.isDropdownOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  /**
   * Open the dropdown panel
   */
  openDropdown(): void {
    if (this.disabled) return;

    this.isDropdownOpen = true;
    this.onTouched();
    this.dropdownOpened.emit();
  }

  /**
   * Close the dropdown panel
   */
  closeDropdown(): void {
    // Save the current mode from the calendar before closing
    if (this.calendarComponent) {
      this.currentMode = this.calendarComponent.mode;
    }
    this.isDropdownOpen = false;
    this.dropdownClosed.emit();
  }

  /**
   * Handle click outside to close dropdown
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isDropdownOpen) return;

    const target = event.target as HTMLElement;
    const clickedInside =
      this.inputElement?.nativeElement.contains(target) ||
      this.dropdownContainer?.nativeElement.contains(target);

    if (!clickedInside) {
      this.closeDropdown();
    }
  }

  /**
   * Handle Escape key to close dropdown
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.isDropdownOpen) {
      event.preventDefault();
      this.closeDropdown();
    }
  }

  /**
   * Handle Enter key to open dropdown when input is focused
   */
  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isDropdownOpen) {
      event.preventDefault();
      this.openDropdown();
    }
  }

  // ============================================================
  // CALENDAR EVENT HANDLERS
  // ============================================================

  /**
   * Handle date selection from calendar (Confirm button or day click)
   */
  onCalendarSubmit(event: DayInfo | DayInfo[]): void {
    this.currentValue = event;
    this.updateDisplayValue(event);
    this.onChange(event);
    this.dateSelected.emit(event);
    this.closeDropdown();
  }

  /**
   * Handle day selection from calendar
   * In range mode, only close when both dates are selected
   * When time picker is enabled, emit value but keep dropdown open
   */
  onDaySelect(event: DayInfo | DayInfo[] | any): void {
    // Update current value
    this.currentValue = event;
    this.updateDisplayValue(event);
    
    // Always emit the change immediately
    this.onChange(event);
    this.dateSelected.emit(event);

    // If time picker is enabled, keep dropdown open for time adjustments
    // User can click outside to close
    if (this.enableTime) {
      // Don't close - let user adjust time or click outside
      return;
    }

    // In single selection mode (without time), close immediately
    if (this.selectionMode === 'single') {
      this.closeDropdown();
      return;
    }

    // In range selection mode, check if both dates are selected
    if (this.selectionMode === 'range') {
      // Check if event has both start and end (range complete)
      const isRangeComplete =
        event &&
        ((Array.isArray(event) && event.length === 2) ||
          (event.start && event.end));

      if (isRangeComplete) {
        // Range is complete, close dropdown
        this.closeDropdown();
      }
      // Otherwise, keep dropdown open for second date selection
    }
  }

  /**
   * Handle cancel action
   */
  onCancelClicked(): void {
    this.closeDropdown();
  }

  // ============================================================
  // HELPER METHODS
  // ============================================================

  /**
   * Initialize component with a date value
   */
  private initializeWithDate(date: Date | string): void {
    // Convert date to DayInfo format if needed
    // This is simplified - in production you'd use DateUtilitiesService
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      const dayInfo: DayInfo = {
        gD: formattedDate,
        uD: '', // Would need conversion
        dN: '',
        uC: 0,
        selected: true,
      };

      if (this.enableTime) {
        dayInfo.time = {
          hour: date.getHours(),
          minute: date.getMinutes(),
        };
      }

      this.currentValue = dayInfo;
      this.updateDisplayValue(dayInfo);
    }
  }

  /**
   * Update the display value in the input field
   */
  private updateDisplayValue(value: DayInfo | DayInfo[] | any): void {
    if (!value) {
      this.displayValue = '';
      return;
    }

    // Handle range selection with start/end properties
    if (value.start) {
      const start = this.formatDayInfo(value.start);
      if (value.end) {
        const end = this.formatDayInfo(value.end);
        this.displayValue = `${start} - ${end}`;
      } else {
        // Only start date selected so far
        this.displayValue = `${start} - ...`;
      }
      return;
    }

    if (Array.isArray(value)) {
      // Range selection mode with array
      if (value.length === 2) {
        const start = this.formatDayInfo(value[0]);
        const end = this.formatDayInfo(value[1]);
        this.displayValue = `${start} - ${end}`;
      } else if (value.length === 1) {
        this.displayValue = `${this.formatDayInfo(value[0])} - ...`;
      } else {
        this.displayValue = '';
      }
    } else {
      // Single selection mode
      this.displayValue = this.formatDayInfo(value);
    }
  }

  /**
   * Format DayInfo object to display string
   */
  private formatDayInfo(dayInfo: DayInfo): string {
    let result = '';

    // Use Gregorian date by default (you can make this configurable)
    if (this.mode === 'greg') {
      result = dayInfo.gD; // Already in DD/MM/YYYY format
    } else {
      result = dayInfo.uD; // Hijri date
    }

    // Append time if available
    if (dayInfo.time && this.enableTime) {
      const hour = dayInfo.time.hour;
      const minute = dayInfo.time.minute.toString().padStart(2, '0');

      if (this.useMeridian) {
        // 12-hour format
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        result += ` ${displayHour}:${minute} ${period}`;
      } else {
        // 24-hour format
        result += ` ${hour.toString().padStart(2, '0')}:${minute}`;
      }
    }

    return result;
  }

  /**
   * Clear the current value
   */
  clearValue(): void {
    this.currentValue = null;
    this.displayValue = '';
    this.onChange(null);
    this.dateSelected.emit(null as any);
  }

  /**
   * Get current value (useful for programmatic access)
   */
  getValue(): DayInfo | DayInfo[] | null {
    return this.currentValue;
  }

  /**
   * Get the initial date for the calendar picker
   * Handles conversion of currentValue to format accepted by calendar
   */
  getInitialDateForCalendar(): Date | string | undefined {
    if (this.initialDate) {
      return this.initialDate;
    }

    // If currentValue is a single DayInfo, create a Date object with time
    if (this.currentValue && !Array.isArray(this.currentValue) && !(this.currentValue as any).start) {
      if (this.enableTime && this.currentValue.time) {
        return this.createDateFromDayInfo(this.currentValue);
      }
      return this.currentValue.gD;
    }

    return undefined;
  }

  /**
   * Get the initial range start for the calendar picker
   * Used to restore range selection when reopening calendar
   */
  getInitialRangeStart(): Date | string | undefined {
    if (!this.currentValue || this.selectionMode !== 'range') {
      return undefined;
    }

    // Handle range object with start property
    if ((this.currentValue as any).start) {
      const start = (this.currentValue as any).start;
      if (this.enableTime && start.time) {
        return this.createDateFromDayInfo(start);
      }
      return start.gD;
    }

    // Handle array format
    if (Array.isArray(this.currentValue) && this.currentValue.length > 0) {
      const start = this.currentValue[0];
      if (this.enableTime && start.time) {
        return this.createDateFromDayInfo(start);
      }
      return start.gD;
    }

    return undefined;
  }

  /**
   * Get the initial range end for the calendar picker
   * Used to restore range selection when reopening calendar
   */
  getInitialRangeEnd(): Date | string | undefined {
    if (!this.currentValue || this.selectionMode !== 'range') {
      return undefined;
    }

    // Handle range object with end property
    if ((this.currentValue as any).start && (this.currentValue as any).end) {
      const end = (this.currentValue as any).end;
      if (this.enableTime && end.time) {
        return this.createDateFromDayInfo(end);
      }
      return end.gD;
    }

    // Handle array format
    if (Array.isArray(this.currentValue) && this.currentValue.length === 2) {
      const end = this.currentValue[1];
      if (this.enableTime && end.time) {
        return this.createDateFromDayInfo(end);
      }
      return end.gD;
    }

    return undefined;
  }

  /**
   * Create a Date object from DayInfo with time information
   */
  private createDateFromDayInfo(dayInfo: DayInfo): Date {
    // Use service to parse date string
    const date = new Date();
    const parts = dayInfo.gD.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    
    date.setFullYear(year, month, day);
    
    // Set time if available
    if (dayInfo.time) {
      date.setHours(dayInfo.time.hour, dayInfo.time.minute, 0, 0);
    } else {
      date.setHours(0, 0, 0, 0);
    }

    return date;
  }
}
