# Angular Hijri-Gregorian Datepicker - Extended Features

## Overview

This document describes the new extended features added to the Angular Hijri-Gregorian Datepicker library while maintaining full backward compatibility with existing implementations.

## New Features

### 1️⃣ Time Picker Support

Add optional time selection (hours & minutes) to the datepicker.

**New Input:**
```typescript
@Input() enableTime: boolean = false;
```

**Interface:**
```typescript
export interface TimeValue {
  hour: number;   // 0-23 for 24-hour format
  minute: number; // 0-59
}

export interface DayInfo {
  gD: string;       // Gregorian date
  uD: string;       // Um al-Qurra date
  dN: string;       // Day name shorthand
  uC: number;
  selected?: boolean;
  disabled?: boolean;
  time?: TimeValue; // NEW: Optional time information
}
```

**Usage Example:**
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  (onSubmit)="handleDateWithTime($event)">
</hijri-gregorian-datepicker>
```

```typescript
handleDateWithTime(result: DayInfo) {
  console.log('Selected date:', result.gD);
  console.log('Selected time:', result.time); 
  // Output: { hour: 14, minute: 30 }
}
```

---

### 2️⃣ Min and Max Date Constraints

Add support for minimum and maximum date constraints that work with both Hijri and Gregorian calendars.

**New Inputs:**
```typescript
@Input() minDate?: Date | string; // Minimum allowed date
@Input() maxDate?: Date | string; // Maximum allowed date
```

**Accepted Formats:**
- JavaScript `Date` object
- String in `DD/MM/YYYY` format (Gregorian)

**Behavior:**
- Dates outside the allowed range are visually disabled
- Clicking disabled dates has no effect
- Works correctly for both Gregorian and Hijri modes

**Usage Example:**
```html
<!-- Restrict to dates within the current year -->
<hijri-gregorian-datepicker
  [minDate]="'01/01/2025'"
  [maxDate]="'31/12/2025'"
  (onSubmit)="handleDate($event)">
</hijri-gregorian-datepicker>

<!-- Using Date objects -->
<hijri-gregorian-datepicker
  [minDate]="minDateObj"
  [maxDate]="maxDateObj"
  (onSubmit)="handleDate($event)">
</hijri-gregorian-datepicker>
```

```typescript
export class MyComponent {
  minDateObj = new Date(2025, 0, 1);  // January 1, 2025
  maxDateObj = new Date(2025, 11, 31); // December 31, 2025
  
  handleDate(result: DayInfo) {
    console.log('Selected date:', result.gD);
  }
}
```

---

### 3️⃣ Initial Date Support

Navigate to a specific date when the picker opens.

**New Input:**
```typescript
@Input() initialDate?: Date | string; // Initial date to navigate to
```

**Accepted Formats:**
- JavaScript `Date` object
- String in `DD/MM/YYYY` format (Gregorian)

**Behavior:**
- When the picker opens, it navigates to the specified date
- The month and year dropdowns are set to the initial date
- Works correctly for both Gregorian and Hijri modes
- If not provided, defaults to today's date

**Usage Example:**
```html
<!-- Navigate to a specific date on open -->
<hijri-gregorian-datepicker
  [initialDate]="'15/06/2025'"
  (onSubmit)="handleDate($event)">
</hijri-gregorian-datepicker>

<!-- Using Date object -->
<hijri-gregorian-datepicker
  [initialDate]="targetDate"
  (onSubmit)="handleDate($event)">
</hijri-gregorian-datepicker>
```

```typescript
export class MyComponent {
  targetDate = new Date(2025, 5, 15); // June 15, 2025
  
  handleDate(result: DayInfo) {
    console.log('Selected date:', result.gD);
  }
}
```

---

## Combined Usage Examples

### Example 1: Time Picker with Date Range

```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [minDate]="'01/01/2025'"
  [maxDate]="'31/12/2025'"
  [initialDate]="'15/06/2025'"
  [mode]="'greg'"
  [locale]="'en'"
  (onSubmit)="handleSelection($event)">
</hijri-gregorian-datepicker>
```

```typescript
export class AppComponent {
  handleSelection(result: DayInfo) {
    console.log('Date:', result.gD);        // "15/06/2025"
    console.log('Time:', result.time);       // { hour: 14, minute: 30 }
    console.log('Hijri:', result.uD);        // "19/11/1446"
  }
}
```

### Example 2: Hijri Mode with Constraints

```html
<hijri-gregorian-datepicker
  [mode]="'ummAlQura'"
  [locale]="'ar'"
  [dir]="'rtl'"
  [minDate]="minDate"
  [maxDate]="maxDate"
  [initialDate]="initialDate"
  (onSubmit)="handleHijriDate($event)">
</hijri-gregorian-datepicker>
```

```typescript
export class AppComponent {
  minDate = new Date(2025, 0, 1);   // Jan 1, 2025
  maxDate = new Date(2025, 11, 31);  // Dec 31, 2025
  initialDate = new Date(2025, 5, 15); // Jun 15, 2025

  handleHijriDate(result: DayInfo) {
    console.log('Hijri Date:', result.uD);
    console.log('Gregorian Date:', result.gD);
  }
}
```

### Example 3: Multiple Dates with Time

```html
<hijri-gregorian-datepicker
  [selectionMode]="'multiple'"
  [enableTime]="true"
  [minDate]="'01/06/2025'"
  [maxDate]="'30/06/2025'"
  (onSubmit)="handleMultipleDates($event)">
</hijri-gregorian-datepicker>
```

```typescript
export class AppComponent {
  handleMultipleDates(results: DayInfo[]) {
    results.forEach(day => {
      console.log(`Date: ${day.gD}, Time: ${day.time?.hour}:${day.time?.minute}`);
    });
  }
}
```

### Example 4: Only Future Dates with Time

```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [minDate]="today"
  [futureValidation]="false"
  (onSubmit)="handleFutureDate($event)">
</hijri-gregorian-datepicker>
```

```typescript
export class AppComponent {
  today = new Date();

  handleFutureDate(result: DayInfo) {
    const fullDateTime = `${result.gD} ${result.time?.hour}:${result.time?.minute}`;
    console.log('Selected:', fullDateTime);
  }
}
```

---

## API Changes Summary

### New Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `enableTime` | `boolean` | `false` | Enable time picker (hours & minutes) |
| `minDate` | `Date \| string` | `undefined` | Minimum allowed date |
| `maxDate` | `Date \| string` | `undefined` | Maximum allowed date |
| `initialDate` | `Date \| string` | `undefined` | Initial date to navigate to |

### Updated Interfaces

**TimeValue** (New):
```typescript
export interface TimeValue {
  hour: number;   // 0-23
  minute: number; // 0-59
}
```

**DayInfo** (Extended):
```typescript
export interface DayInfo {
  gD: string;
  uD: string;
  dN: string;
  uC: number;
  selected?: boolean;
  disabled?: boolean; // NEW
  time?: TimeValue;   // NEW
}
```

### New Utility Methods (DateUtilitiesService)

```typescript
// Normalize date to DD/MM/YYYY string
normalizeDateToString(date: Date | string | undefined): string | null

// Compare two Gregorian dates
compareDates(date1Str: string, date2Str: string): number

// Compare two Hijri dates
compareHijriDates(hijri1: string, hijri2: string): number

// Check if date is within range
isDateInRange(dateStr: string, minDateStr: string | null, maxDateStr: string | null): boolean

// Check if Hijri date is within range
isHijriDateInRange(hijriDateStr: string, minDateStr: string | null, maxDateStr: string | null): boolean
```

---

## Backward Compatibility

✅ **All existing features and APIs remain unchanged**

- If `enableTime` is not set (default `false`), the datepicker behaves exactly as before
- The `time` property in `DayInfo` is optional and won't be present if `enableTime` is false
- If `minDate`/`maxDate` are not provided, all dates are selectable (no restrictions)
- If `initialDate` is not provided, defaults to today's date
- All existing inputs, outputs, and methods work exactly as before

**Migration from old code:**
```typescript
// Old code (still works)
<hijri-gregorian-datepicker
  (onSubmit)="handleDate($event)">
</hijri-gregorian-datepicker>

// New features are opt-in
<hijri-gregorian-datepicker
  [enableTime]="true"
  [minDate]="minDate"
  [maxDate]="maxDate"
  (onSubmit)="handleDate($event)">
</hijri-gregorian-datepicker>
```

---

## Visual Indicators

### Disabled Dates
- Dates outside `minDate`/`maxDate` range are visually grayed out
- Opacity reduced to 0.4
- Cursor shows "not-allowed" on hover
- Clicking has no effect

### Time Picker
- Clean, minimal UI
- Dropdown selectors for hours (0-23) and minutes (0-59)
- Supports both LTR and RTL layouts
- Respects theme styling
- Shows labels in both English and Arabic based on `locale`

---

## Accessibility

- Time picker dropdowns are keyboard navigable
- Disabled dates can be skipped with keyboard navigation
- All inputs maintain proper focus management
- ARIA attributes can be added for screen readers (recommended enhancement)

---

## Implementation Notes

### Key Changes Made

1. **Interfaces** ([calendar-model.ts](projects/hijri-gregorian-datepicker/src/_interfaces/calendar-model.ts))
   - Added `TimeValue` interface
   - Extended `DayInfo` with `disabled` and `time` properties

2. **Component** ([hijri-gregorian-datepicker.component.ts](projects/hijri-gregorian-datepicker/src/lib/hijri-gregorian-datepicker.component.ts))
   - Added new `@Input()` properties
   - Added time picker variables (`selectedTime`, `hours`, `minutes`)
   - Updated `getTodaysDateInfo()` to respect `initialDate`
   - Updated `initializeYearsAndMonths()` to use `initialDate` or today
   - Added `isDateDisabled()` method for min/max validation
   - Updated `onDayClicked()` to check disabled state
   - Updated `markDaySelected()` to attach time data
   - Updated `onConfirmClicked()` to include time in output

3. **Service** ([date-utilities.service.ts](projects/hijri-gregorian-datepicker/src/_services/date-utilities.service.ts))
   - Added `normalizeDateToString()` for date conversion
   - Added `compareDates()` for Gregorian date comparison
   - Added `compareHijriDates()` for Hijri date comparison
   - Added `isDateInRange()` for range validation
   - Added `isHijriDateInRange()` for Hijri range validation

4. **Template** ([hijri-gregorian-datepicker.component.html](projects/hijri-gregorian-datepicker/src/lib/hijri-gregorian-datepicker.component.html))
   - Updated day styling to show disabled state
   - Added time picker section (conditionally shown)
   - Added hour/minute dropdowns with ngModel binding

5. **Styles** ([hijri-gregorian-datepicker.component.scss](projects/hijri-gregorian-datepicker/src/lib/hijri-gregorian-datepicker.component.scss))
   - Added `.time-picker-section` styles
   - Added `.time-picker-controls` and `.time-input-group` styles
   - Maintained consistent theming with existing component

6. **Public API** ([public-api.ts](projects/hijri-gregorian-datepicker/src/public-api.ts))
   - Exported calendar-model interfaces including `TimeValue`

---

## Testing Recommendations

1. **Time Picker:**
   - Test with both Gregorian and Hijri modes
   - Verify time is correctly attached to selected dates
   - Test multiple date selection with time

2. **Min/Max Constraints:**
   - Test with Gregorian dates in Gregorian mode
   - Test with Gregorian dates in Hijri mode
   - Test edge cases (min = max, no dates in range)
   - Test with Date objects and string formats

3. **Initial Date:**
   - Test with dates in the past
   - Test with dates in the future
   - Test with Gregorian and Hijri modes
   - Test with invalid dates (should fall back to today)

4. **Backward Compatibility:**
   - Test existing implementations without new inputs
   - Verify output format remains unchanged when `enableTime=false`

---

## Support

For issues or questions, please refer to the main project documentation or open an issue on the repository.
