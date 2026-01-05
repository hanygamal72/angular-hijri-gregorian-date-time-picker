# Date Display Format Guide

This guide shows how to control the display format of dates in the `hijri-gregorian-datepicker` and `hijri-gregorian-datetime-input` components.

## Overview

The datepicker now supports customizable date display formats, allowing you to control how dates appear in the input field and throughout the calendar interface.

## Supported Formats

The following date format patterns are supported:

| Format | Example | Description |
|--------|---------|-------------|
| `DD/MM/YYYY` | `19/12/1446` | Day/Month/Year (default) |
| `MM/DD/YYYY` | `12/19/1446` | Month/Day/Year (US format) |
| `YYYY/MM/DD` | `1446/12/19` | Year/Month/Day (ISO-like) |
| `DD-MM-YYYY` | `19-12-1446` | Day-Month-Year with dashes |
| `MM-DD-YYYY` | `12-19-1446` | Month-Day-Year with dashes |
| `YYYY-MM-DD` | `1446-12-19` | Year-Month-Day with dashes (ISO) |
| `YYYY/DD/MM` | `1446/19/12` | Year/Day/Month |
| `DD/YYYY/MM` | `19/1446/12` | Day/Year/Month |
| `MM/YYYY/DD` | `12/1446/19` | Month/Year/Day |

## Usage Examples

### 1. DateTime Input Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <!-- Default Format (DD/MM/YYYY) -->
    <hijri-gregorian-datetime-input
      [(ngModel)]="selectedDate1"
      placeholder="Select date (DD/MM/YYYY)"
    ></hijri-gregorian-datetime-input>

    <!-- US Format (MM/DD/YYYY) -->
    <hijri-gregorian-datetime-input
      [(ngModel)]="selectedDate2"
      placeholder="Select date (MM/DD/YYYY)"
      dateFormat="MM/DD/YYYY"
    ></hijri-gregorian-datetime-input>

    <!-- ISO-like Format (YYYY-MM-DD) -->
    <hijri-gregorian-datetime-input
      [(ngModel)]="selectedDate3"
      placeholder="Select date (YYYY-MM-DD)"
      dateFormat="YYYY-MM-DD"
    ></hijri-gregorian-datetime-input>

    <!-- Year First with Slashes (YYYY/MM/DD) -->
    <hijri-gregorian-datetime-input
      [(ngModel)]="selectedDate4"
      placeholder="Select date (YYYY/MM/DD)"
      dateFormat="YYYY/MM/DD"
    ></hijri-gregorian-datetime-input>
  `
})
export class ExampleComponent {
  selectedDate1: any;
  selectedDate2: any;
  selectedDate3: any;
  selectedDate4: any;
}
```

### 2. Datepicker Component (Standalone)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
    <hijri-gregorian-datepicker
      [mode]="'greg'"
      [locale]="'en'"
      [dateDisplayFormat]="dateFormat"
      (onSubmit)="onDateSelected($event)"
    ></hijri-gregorian-datepicker>

    <!-- Toggle Format Button -->
    <button (click)="toggleFormat()">
      Current Format: {{ dateFormat }}
    </button>
  `
})
export class CalendarComponent {
  dateFormat = 'DD/MM/YYYY';
  formats = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'YYYY-MM-DD'];
  currentIndex = 0;

  toggleFormat() {
    this.currentIndex = (this.currentIndex + 1) % this.formats.length;
    this.dateFormat = this.formats[this.currentIndex];
  }

  onDateSelected(event: any) {
    console.log('Selected date:', event);
  }
}
```

### 3. Hijri Calendar with Custom Format

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hijri-calendar',
  template: `
    <!-- Hijri Calendar with Year-First Format -->
    <hijri-gregorian-datetime-input
      [(ngModel)]="hijriDate"
      mode="ummAlQura"
      locale="ar"
      dir="rtl"
      dateFormat="YYYY/MM/DD"
      placeholder="اختر التاريخ الهجري"
    ></hijri-gregorian-datetime-input>

    <!-- Display: 1446/12/19 instead of 19/12/1446 -->
  `
})
export class HijriCalendarComponent {
  hijriDate: any;
}
```

### 4. Reactive Forms with Different Formats

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-example',
  template: `
    <form [formGroup]="dateForm">
      <!-- Birth Date (DD/MM/YYYY) -->
      <div class="form-field">
        <label>Birth Date</label>
        <hijri-gregorian-datetime-input
          formControlName="birthDate"
          dateFormat="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
        ></hijri-gregorian-datetime-input>
      </div>

      <!-- Expiry Date (MM/DD/YYYY) -->
      <div class="form-field">
        <label>Expiry Date</label>
        <hijri-gregorian-datetime-input
          formControlName="expiryDate"
          dateFormat="MM/DD/YYYY"
          placeholder="MM/DD/YYYY"
        ></hijri-gregorian-datetime-input>
      </div>

      <!-- Registration Date (YYYY-MM-DD) -->
      <div class="form-field">
        <label>Registration Date</label>
        <hijri-gregorian-datetime-input
          formControlName="registrationDate"
          dateFormat="YYYY-MM-DD"
          placeholder="YYYY-MM-DD"
        ></hijri-gregorian-datetime-input>
      </div>
    </form>
  `
})
export class FormExampleComponent implements OnInit {
  dateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dateForm = this.fb.group({
      birthDate: [null],
      expiryDate: [null],
      registrationDate: [null]
    });
  }
}
```

### 5. Dynamic Format Selection

```typescript
import { Component } from '@angular/core';

interface FormatOption {
  label: string;
  value: string;
  example: string;
}

@Component({
  selector: 'app-format-selector',
  template: `
    <div class="format-selector">
      <label>Select Date Format:</label>
      <select [(ngModel)]="selectedFormat">
        <option *ngFor="let format of formats" [value]="format.value">
          {{ format.label }} - Example: {{ format.example }}
        </option>
      </select>
    </div>

    <hijri-gregorian-datetime-input
      [(ngModel)]="selectedDate"
      [dateFormat]="selectedFormat"
      [placeholder]="'Select date (' + selectedFormat + ')'"
    ></hijri-gregorian-datetime-input>

    <div *ngIf="selectedDate" class="result">
      <strong>Selected Date:</strong> {{ formatDate(selectedDate) }}
    </div>
  `
})
export class FormatSelectorComponent {
  selectedFormat = 'DD/MM/YYYY';
  selectedDate: any;

  formats: FormatOption[] = [
    { label: 'European (DD/MM/YYYY)', value: 'DD/MM/YYYY', example: '19/12/2024' },
    { label: 'US (MM/DD/YYYY)', value: 'MM/DD/YYYY', example: '12/19/2024' },
    { label: 'ISO (YYYY-MM-DD)', value: 'YYYY-MM-DD', example: '2024-12-19' },
    { label: 'Year First (YYYY/MM/DD)', value: 'YYYY/MM/DD', example: '2024/12/19' },
    { label: 'Dashed EU (DD-MM-YYYY)', value: 'DD-MM-YYYY', example: '19-12-2024' },
    { label: 'Dashed US (MM-DD-YYYY)', value: 'MM-DD-YYYY', example: '12-19-2024' }
  ];

  formatDate(dayInfo: any): string {
    if (!dayInfo) return '';
    // The component already formats it according to selectedFormat
    return dayInfo.gD || dayInfo.uD || '';
  }
}
```

## Range Selection with Custom Format

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-range-example',
  template: `
    <!-- Date Range with Year-First Format -->
    <hijri-gregorian-datetime-input
      [(ngModel)]="dateRange"
      selectionMode="range"
      dateFormat="YYYY/MM/DD"
      placeholder="Select date range"
    ></hijri-gregorian-datetime-input>

    <!-- Display: 2024/12/01 - 2024/12/31 -->
  `
})
export class RangeExampleComponent {
  dateRange: any;
}
```

## With Time Picker

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-datetime-example',
  template: `
    <hijri-gregorian-datetime-input
      [(ngModel)]="dateTime"
      [enableTime]="true"
      [useMeridian]="true"
      dateFormat="MM/DD/YYYY"
      placeholder="Select date and time"
    ></hijri-gregorian-datetime-input>

    <!-- Display: 12/19/2024 3:30 PM -->
  `
})
export class DateTimeExampleComponent {
  dateTime: any;
}
```

## Best Practices

### 1. **Match Format with User Locale**
```typescript
// Detect user locale and set appropriate format
constructor() {
  const userLocale = navigator.language;
  if (userLocale.startsWith('en-US')) {
    this.dateFormat = 'MM/DD/YYYY';
  } else if (userLocale.startsWith('en-GB')) {
    this.dateFormat = 'DD/MM/YYYY';
  } else {
    this.dateFormat = 'YYYY-MM-DD'; // ISO format as fallback
  }
}
```

### 2. **Consistent Format Across Application**
```typescript
// Create a configuration service
@Injectable({ providedIn: 'root' })
export class DateFormatConfig {
  readonly dateFormat = 'DD/MM/YYYY'; // Set your app's default
}

// Use in components
constructor(private dateConfig: DateFormatConfig) {
  this.format = this.dateConfig.dateFormat;
}
```

### 3. **Document Format for Users**
Always show the expected format in the placeholder or label:
```html
<label>Birth Date (DD/MM/YYYY)</label>
<hijri-gregorian-datetime-input
  dateFormat="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
></hijri-gregorian-datetime-input>
```

### 4. **Format Validation**
```typescript
// Ensure format matches your backend expectations
onSubmit() {
  const dateStr = this.selectedDate.gD; // Always in DD/MM/YYYY internally
  
  // Convert to your backend format if needed
  const [day, month, year] = dateStr.split('/');
  const isoFormat = `${year}-${month}-${day}`; // YYYY-MM-DD
  
  this.api.saveDate(isoFormat);
}
```

## Regional Examples

### Middle East (Hijri Calendar)
```html
<hijri-gregorian-datetime-input
  mode="ummAlQura"
  locale="ar"
  dir="rtl"
  dateFormat="YYYY/MM/DD"
  placeholder="التاريخ الهجري"
></hijri-gregorian-datetime-input>
```

### United States
```html
<hijri-gregorian-datetime-input
  mode="greg"
  locale="en"
  dateFormat="MM/DD/YYYY"
  placeholder="MM/DD/YYYY"
></hijri-gregorian-datetime-input>
```

### Europe
```html
<hijri-gregorian-datetime-input
  mode="greg"
  locale="en"
  dateFormat="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
></hijri-gregorian-datetime-input>
```

### Asia Pacific / ISO Standard
```html
<hijri-gregorian-datetime-input
  mode="greg"
  locale="en"
  dateFormat="YYYY-MM-DD"
  placeholder="YYYY-MM-DD"
></hijri-gregorian-datetime-input>
```

## Important Notes

1. **Internal Storage**: Regardless of display format, dates are stored internally as `DD/MM/YYYY` for consistency
2. **Format Separator**: You can use either `/` or `-` as separators in your format pattern
3. **Hijri Support**: All formats work for both Gregorian and Hijri calendars
4. **Today's Date**: The today's date section in the calendar will also respect the chosen format
5. **Backward Compatibility**: The default format remains `DD/MM/YYYY` to maintain backward compatibility

## Troubleshooting

### Issue: Format not updating
**Solution**: Make sure you're binding to the correct property:
- For `hijri-gregorian-datetime-input`: use `dateFormat`
- For `hijri-gregorian-datepicker`: use `dateDisplayFormat`

### Issue: Format shows incorrectly with Arabic locale
**Solution**: The component automatically handles Arabic numeral conversion. Make sure `locale="ar"` is set.

### Issue: Backend expects different format
**Solution**: The display format is separate from data format. Convert the date when sending to backend:
```typescript
// Display format: MM/DD/YYYY
// Internal: DD/MM/YYYY
// Convert to backend format (e.g., YYYY-MM-DD)
const [day, month, year] = dateObj.gD.split('/');
const backendFormat = `${year}-${month}-${day}`;
```

## API Reference

### hijri-gregorian-datetime-input

```typescript
@Input() dateFormat: string = 'DD/MM/YYYY';
```
Controls the display format of dates in the input field.

### hijri-gregorian-datepicker

```typescript
@Input() dateDisplayFormat: string = 'DD/MM/YYYY';
```
Controls the display format of dates in the calendar picker.

## Complete Working Example

See the demo application for a complete working example with all format options:

```bash
cd projects/angular-hijri-gregorian-datepicker
ng serve
# Navigate to http://localhost:4200
```
