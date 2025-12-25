# Time Picker Usage Examples

## Example 1: Basic Time Picker with Current Time
```html
<hijri-gregorian-datepicker
  [enableTime]="true">
</hijri-gregorian-datepicker>
```

**Result:** 
- Date picker opens with time picker enabled
- Time defaults to **current system time** (e.g., 14:30 if it's 2:30 PM)
- User can click up/down arrows or type directly

---

## Example 2: Time Picker with Initial Date and Time
```typescript
// In your component.ts
export class MyComponent {
  initialDate = new Date(2025, 5, 15, 14, 30); // June 15, 2025 at 14:30
}
```

```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [initialDate]="initialDate">
</hijri-gregorian-datepicker>
```

**Result:**
- Calendar navigates to June 15, 2025
- Time picker shows 14:30 (2:30 PM)

---

## Example 3: Time Picker with Date String (No Time)
```typescript
// In your component.ts
export class MyComponent {
  initialDate = "15/06/2025"; // DD/MM/YYYY format
}
```

```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [initialDate]="initialDate">
</hijri-gregorian-datepicker>
```

**Result:**
- Calendar navigates to June 15, 2025
- Time picker shows **current system time** (because string has no time info)

---

## Example 4: Without Time Picker (Original Behavior)
```html
<hijri-gregorian-datepicker
  [enableTime]="false">
</hijri-gregorian-datepicker>
```

**Result:**
- Time picker does **NOT** appear
- Component behaves exactly as before the update
- No time logic runs

---

## Example 5: Full Configuration with Time
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [canChangeMode]="true"
  [todaysDateSection]="true"
  [markToday]="true"
  [mode]="'greg'"
  [dir]="'ltr'"
  [locale]="'en'"
  [theme]="'Ocean Breeze'"
  [pastYearsLimit]="90"
  [futureYearsLimit]="10"
  [minDate]="minDate"
  [maxDate]="maxDate"
  [initialDate]="initialDate"
  (onSubmit)="handleSubmit($event)"
  (onDaySelect)="handleDaySelect($event)">
</hijri-gregorian-datepicker>
```

```typescript
// In your component.ts
export class MyComponent {
  minDate = new Date(2020, 0, 1); // Jan 1, 2020
  maxDate = new Date(2030, 11, 31); // Dec 31, 2030
  initialDate = new Date(); // Today with current time

  handleSubmit(event: any) {
    console.log('Selected date:', event);
    // event will include time property:
    // {
    //   gD: "25/12/2025",
    //   uD: "23/06/1447",
    //   time: { hour: 14, minute: 30 }
    // }
  }

  handleDaySelect(event: any) {
    console.log('Day selected:', event);
    // Same structure as onSubmit
  }
}
```

---

## Example 6: Multiple Date Selection with Time
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [multiple]="true"
  (onSubmit)="handleMultipleSubmit($event)">
</hijri-gregorian-datepicker>
```

```typescript
// In your component.ts
export class MyComponent {
  handleMultipleSubmit(events: any[]) {
    console.log('Selected dates:', events);
    // Array of dates, each with time:
    // [
    //   { gD: "25/12/2025", uD: "23/06/1447", time: { hour: 14, minute: 30 } },
    //   { gD: "26/12/2025", uD: "24/06/1447", time: { hour: 14, minute: 30 } },
    //   ...
    // ]
  }
}
```

**Result:**
- User can select multiple dates
- Each selected date shares the **same time** from the time picker

---

## Example 7: Hijri Mode with Time
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [mode]="'ummAlQura'"
  [locale]="'ar'"
  [dir]="'rtl'">
</hijri-gregorian-datepicker>
```

**Result:**
- Calendar shows in Hijri (Islamic) mode
- Arabic locale and RTL direction
- Time picker labels in Arabic: "ساعة" (Hour), "دقيقة" (Minute)
- Time values displayed in Arabic numerals

---

## Output Structure

When a date is selected with `enableTime="true"`, the output includes a `time` property:

```typescript
interface DayInfo {
  gD: string;           // Gregorian date (DD/MM/YYYY)
  uD: string;           // Hijri date (DD/MM/YYYY)
  selected: boolean;    // Is this day selected?
  time?: {              // ⬅️ NEW: Only present when enableTime=true
    hour: number;       // 0-23
    minute: number;     // 0-59
  };
  // ... other properties
}
```

### Single Date Output Example:
```json
{
  "gD": "25/12/2025",
  "uD": "23/06/1447",
  "selected": true,
  "time": {
    "hour": 14,
    "minute": 30
  }
}
```

### Multiple Dates Output Example:
```json
[
  {
    "gD": "25/12/2025",
    "uD": "23/06/1447",
    "selected": true,
    "time": { "hour": 14, "minute": 30 }
  },
  {
    "gD": "26/12/2025",
    "uD": "24/06/1447",
    "selected": true,
    "time": { "hour": 14, "minute": 30 }
  }
]
```

---

## Keyboard Shortcuts

When the time input is focused:

- **Arrow Up**: Increment value
- **Arrow Down**: Decrement value
- **Type directly**: Enter hours (0-23) or minutes (0-59)
- **Invalid values**: Automatically clamped to valid range

---

## Visual Appearance

The new time picker features:

```
┌─────────────────────────────────┐
│           Time                  │
├─────────────────────────────────┤
│   Hour            Minute        │
│    ▲                ▲           │
│  ┌────┐     :    ┌────┐        │
│  │ 14 │          │ 30 │        │
│  └────┘          └────┘        │
│    ▼                ▼           │
└─────────────────────────────────┘
```

- Up/down arrows for incrementing/decrementing
- Large, centered numeric display
- Colon separator between hours and minutes
- Smooth hover/focus animations

---

## Migration from Old Select UI

**No migration needed!** The component automatically uses the new UI.

If you had:
```html
<!-- Old code with enableTime (was using select dropdowns) -->
<hijri-gregorian-datepicker [enableTime]="true"></hijri-gregorian-datepicker>
```

It now automatically uses the new stepper UI. No code changes required.

---

## Browser Compatibility

The new time picker uses:
- Standard HTML input type="number"
- CSS Flexbox
- SVG icons
- No external dependencies

**Supported browsers:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

---

## Accessibility Features

- ✅ ARIA labels on all buttons
- ✅ Keyboard navigation (arrow keys)
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ High contrast support

---

## Theming

The time picker respects your theme configuration:

```typescript
styles = {
  primaryColor: '#2196F3',
  backgroundColor: '#f5f5f5',
  todaysDateBgColor: '#2196F3',
  borderRadius: '8px',
  fontFamily: 'Roboto, sans-serif'
};
```

```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [styles]="styles">
</hijri-gregorian-datepicker>
```

The time picker buttons and inputs will automatically use:
- `todaysDateBgColor` for button/input backgrounds
- `primaryColor` for labels and text
- `borderRadius` for rounded corners
- `fontFamily` for consistent typography

---

## Performance Notes

- Time picker only renders when `enableTime="true"`
- No performance impact when disabled
- Lightweight implementation (~150 lines of code)
- No external dependencies
