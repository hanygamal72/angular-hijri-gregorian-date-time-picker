# Range Selection with Initial Start & End Dates

## Overview
You can now initialize the range selection mode with both start and end dates pre-selected and highlighted on the calendar.

## New Input Properties

### `@Input() initialRangeStart?: Date | string`
The initial start date for range selection.

### `@Input() initialRangeEnd?: Date | string`
The initial end date for range selection.

## Usage Example

### TypeScript (app.component.ts)
```typescript
export class AppComponent {
  enableTime = true;
  
  // Initial range: June 10-20, 2025 with time
  initialRangeStart = new Date(2025, 5, 10, 9, 0);   // June 10, 2025 at 9:00 AM
  initialRangeEnd = new Date(2025, 5, 20, 17, 30);   // June 20, 2025 at 5:30 PM
  
  onSubmit(ev: any) {
    if (ev.start && ev.end) {
      console.log('Range Start:', ev.start.gD);
      console.log('Range End:', ev.end.gD);
      if (ev.start.time) {
        console.log('Start Time:', `${ev.start.time.hour}:${ev.start.time.minute}`);
      }
      if (ev.end.time) {
        console.log('End Time:', `${ev.end.time.hour}:${ev.end.time.minute}`);
      }
    }
  }
}
```

### HTML Template
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [initialRangeStart]="initialRangeStart"
  [initialRangeEnd]="initialRangeEnd"
  [enableTime]="true"
  [useMeridian]="true"
  (onSubmit)="onSubmit($event)"
  (onDaySelect)="onChange($event)"
></hijri-gregorian-datepicker>
```

## Features

### ✅ On Calendar Load
- Both start and end dates are automatically **highlighted**
- The full range between dates is **visually displayed**
- Dates are marked as selected with proper styling
- Time values are preserved if Date objects are used

### ✅ Time Support
- If `enableTime` is true, both dates can have their own time values
- Start date: Uses time from `initialRangeStart` Date object
- End date: Uses time from `initialRangeEnd` Date object
- Format: 12-hour with AM/PM when `useMeridian="true"`

### ✅ Validation
- Dates are checked against `minDate` and `maxDate` constraints
- Disabled dates are not highlighted
- If end date is before start date, they are automatically swapped

### ✅ User Interaction
- Users can click to select a new range (resets initial range)
- Normal range selection workflow continues after initialization

## Output Format

### onDaySelect Event (during selection)
```javascript
// First click (start selected)
{
  start: {
    gD: "10/06/2025",
    uD: "14/12/1446",
    time: { hour: 9, minute: 0 },
    ...
  },
  end: null
}

// Second click (range complete)
{
  start: { ... },
  end: {
    gD: "20/06/2025",
    uD: "24/12/1446",
    time: { hour: 17, minute: 30 },
    ...
  }
}
```

### onSubmit Event (on confirm)
```javascript
{
  start: {
    day: 10,
    month: "06",
    year: "2025",
    gD: "10/06/2025",
    uD: "14/12/1446",
    time: { hour: 9, minute: 0 },
    ...
  },
  end: {
    day: 20,
    month: "06",
    year: "2025",
    gD: "20/06/2025",
    uD: "24/12/1446",
    time: { hour: 17, minute: 30 },
    ...
  }
}
```

## Input Options

### Date Formats Supported
```typescript
// Date object with time
initialRangeStart = new Date(2025, 5, 10, 9, 0);

// Date object without time (defaults to current system time)
initialRangeStart = new Date(2025, 5, 10);

// String format (DD/MM/YYYY)
initialRangeStart = "10/06/2025";
```

### Single Date vs Range
```typescript
// For single date selection (not range)
[initialDate]="myDate"

// For range selection with both dates
[initialRangeStart]="startDate"
[initialRangeEnd]="endDate"

// For range selection with only start date
[initialRangeStart]="startDate"
// (user must select end date)
```

## Example Scenarios

### Scenario 1: Date Range Only (No Time)
```typescript
initialRangeStart = new Date(2025, 5, 10);
initialRangeEnd = new Date(2025, 5, 20);
enableTime = false;
```

### Scenario 2: Date Range with Time (24-hour format)
```typescript
initialRangeStart = new Date(2025, 5, 10, 9, 0);
initialRangeEnd = new Date(2025, 5, 20, 17, 30);
enableTime = true;
useMeridian = false;
```

### Scenario 3: Date Range with Time (12-hour AM/PM format)
```typescript
initialRangeStart = new Date(2025, 5, 10, 9, 0);   // 9:00 AM
initialRangeEnd = new Date(2025, 5, 20, 17, 30);   // 5:30 PM
enableTime = true;
useMeridian = true;
```

### Scenario 4: String Format Dates
```typescript
initialRangeStart = "10/06/2025";
initialRangeEnd = "20/06/2025";
enableTime = false;
```

## Calendar Display

When the calendar loads with initial range dates:

```
     June 2025
 Su Mo Tu We Th Fr Sa
  1  2  3  4  5  6  7
  8  9 [10 11 12 13 14]
[15 16 17 18 19 20] 21
 22 23 24 25 26 27 28
 29 30

Legend:
[10] - Range start (highlighted)
[11-19] - Range dates (highlighted)
[20] - Range end (highlighted)
```

## Console Output Example

```
🔄 On Day Select: { start: {...}, end: {...} }
✅ Range Complete: 10/06/2025 → 20/06/2025

📅 On Submit: { start: {...}, end: {...} }
🎯 RANGE SELECTED:
  📍 Start: 10/06/2025 (Gregorian) 14/12/1446 (Hijri)
  ⏰ Start Time: 9:00
  📍 End: 20/06/2025 (Gregorian) 24/12/1446 (Hijri)
  ⏰ End Time: 17:30
```

## Browser Testing

Run the application:
```bash
npm start
```

Navigate to `http://localhost:4200` and you'll see:
- Calendar opens to June 2025
- June 10-20 range is pre-highlighted
- Time picker shows 9:00 AM
- Clicking "Confirm" outputs the range

## Notes

- Initial range dates are **optional** - if not provided, users select from scratch
- Both dates must be valid and not disabled by constraints
- If only `initialRangeStart` is set, only the start date is highlighted
- Works with both Gregorian (`mode="greg"`) and Hijri (`mode="ummAlQura"`) calendars
- Fully backward compatible - existing single date selection unaffected
