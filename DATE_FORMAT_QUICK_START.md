# Quick Start - Date Display Format

## What Was Added

You now have full control over the date display format in the datepicker. You can display dates as:

- **19/12/1446** (Day/Month/Year - Default)
- **12/19/1446** (Month/Day/Year - US format)
- **1446/12/19** (Year/Month/Day - Great for Hijri dates!)
- **2024-12-19** (ISO format with dashes)
- And more...

## How to Use

### For DateTime Input Component

Simply add the `dateFormat` property:

```html
<!-- European Format -->
<hijri-gregorian-datetime-input
  [(ngModel)]="date"
  dateFormat="DD/MM/YYYY"
></hijri-gregorian-datetime-input>

<!-- US Format -->
<hijri-gregorian-datetime-input
  [(ngModel)]="date"
  dateFormat="MM/DD/YYYY"
></hijri-gregorian-datetime-input>

<!-- Year First (Hijri) -->
<hijri-gregorian-datetime-input
  [(ngModel)]="hijriDate"
  mode="ummAlQura"
  dateFormat="YYYY/MM/DD"
></hijri-gregorian-datetime-input>

<!-- ISO Format -->
<hijri-gregorian-datetime-input
  [(ngModel)]="date"
  dateFormat="YYYY-MM-DD"
></hijri-gregorian-datetime-input>
```

### For Calendar Component

Use the `dateDisplayFormat` property:

```html
<hijri-gregorian-datepicker
  [mode]="'greg'"
  [dateDisplayFormat]="'MM/DD/YYYY'"
  (onSubmit)="onDateSelected($event)"
></hijri-gregorian-datepicker>
```

## All Supported Formats

| Format | Example Output | When to Use |
|--------|----------------|-------------|
| `DD/MM/YYYY` | 19/12/2024 | Europe, most of world |
| `MM/DD/YYYY` | 12/19/2024 | United States |
| `YYYY/MM/DD` | 2024/12/19 | Asia, ISO-like |
| `YYYY-MM-DD` | 2024-12-19 | ISO 8601, databases |
| `DD-MM-YYYY` | 19-12-2024 | European with dashes |
| `MM-DD-YYYY` | 12-19-2024 | US with dashes |
| `YYYY/DD/MM` | 2024/19/12 | Custom layouts |
| `DD/YYYY/MM` | 19/2024/12 | Custom layouts |
| `MM/YYYY/DD` | 12/2024/19 | Custom layouts |

## TypeScript Usage

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <hijri-gregorian-datetime-input
      [(ngModel)]="selectedDate"
      [dateFormat]="currentFormat"
    ></hijri-gregorian-datetime-input>
    
    <button (click)="toggleFormat()">Toggle Format</button>
  `
})
export class MyComponent {
  selectedDate: any;
  currentFormat = 'DD/MM/YYYY';
  
  toggleFormat() {
    this.currentFormat = 
      this.currentFormat === 'DD/MM/YYYY' 
        ? 'MM/DD/YYYY' 
        : 'DD/MM/YYYY';
  }
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
**Displays:** 1446/12/19

### United States
```html
<hijri-gregorian-datetime-input
  dateFormat="MM/DD/YYYY"
  placeholder="MM/DD/YYYY"
></hijri-gregorian-datetime-input>
```
**Displays:** 12/19/2024

### Europe
```html
<hijri-gregorian-datetime-input
  dateFormat="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
></hijri-gregorian-datetime-input>
```
**Displays:** 19/12/2024

### ISO Standard (Databases)
```html
<hijri-gregorian-datetime-input
  dateFormat="YYYY-MM-DD"
  placeholder="YYYY-MM-DD"
></hijri-gregorian-datetime-input>
```
**Displays:** 2024-12-19

## Important Notes

1. **Display vs Storage**: The format only affects display. Internally, dates are always stored as DD/MM/YYYY for consistency.

2. **Works with Time**: You can combine date format with time picker:
   ```html
   <hijri-gregorian-datetime-input
     dateFormat="MM/DD/YYYY"
     [enableTime]="true"
   ></hijri-gregorian-datetime-input>
   ```
   **Displays:** 12/19/2024 3:30 PM

3. **Backward Compatible**: If you don't specify `dateFormat`, it defaults to `DD/MM/YYYY` (existing behavior).

4. **Both Components**: 
   - For `hijri-gregorian-datetime-input`: use `dateFormat`
   - For `hijri-gregorian-datepicker`: use `dateDisplayFormat`

## Full Documentation

For complete examples, best practices, and troubleshooting, see:
- [DATE_DISPLAY_FORMAT_GUIDE.md](DATE_DISPLAY_FORMAT_GUIDE.md) - Comprehensive guide
- [DATE_FORMAT_IMPLEMENTATION_SUMMARY.md](DATE_FORMAT_IMPLEMENTATION_SUMMARY.md) - Technical details
- [README.md](projects/hijri-gregorian-datepicker/README.md) - API reference

## Try It Now!

1. Update your component:
   ```html
   <hijri-gregorian-datetime-input
     [(ngModel)]="myDate"
     dateFormat="MM/DD/YYYY"
   ></hijri-gregorian-datetime-input>
   ```

2. That's it! Your dates will now display in US format.

## Questions?

Check the [DATE_DISPLAY_FORMAT_GUIDE.md](DATE_DISPLAY_FORMAT_GUIDE.md) for:
- More examples
- Troubleshooting
- Best practices
- Advanced usage scenarios

---

**Feature Added:** January 5, 2026  
**Version:** 1.5.0+  
**Backward Compatible:** ✅ Yes
