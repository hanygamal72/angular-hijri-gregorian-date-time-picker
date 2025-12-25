# AM/PM Support & Range Selection - Implementation Guide

## Overview
This document describes two major new features added to the Hijri-Gregorian datepicker:
1. **12-hour time format with AM/PM toggle**
2. **Range selection mode**

Both features maintain **100% backward compatibility** with existing implementations.

---

## 🕐 Feature 1: AM/PM Support (12-Hour Format)

### Purpose
Enable users to select time in familiar 12-hour format with AM/PM toggle, while maintaining internal 24-hour format for consistency.

### Input Property

```typescript
@Input() useMeridian: boolean = false;
```

**Default:** `false` (24-hour format - existing behavior)

### Behavior

#### When `useMeridian = false` (Default):
- Time picker displays 0-23 hours
- No AM/PM toggle shown
- **Exactly the same as before** ✅

#### When `useMeridian = true`:
- Time picker displays 1-12 hours
- AM/PM toggle button appears
- Internal storage remains 24-hour format (0-23)
- Conversion is automatic and transparent

### Conversion Rules

| 12-Hour Display | 24-Hour Internal | Meridian |
|-----------------|------------------|----------|
| 12:00 AM        | 00:00           | AM       |
| 1:00 AM         | 01:00           | AM       |
| 11:00 AM        | 11:00           | AM       |
| 12:00 PM        | 12:00           | PM       |
| 1:00 PM         | 13:00           | PM       |
| 11:00 PM        | 23:00           | PM       |

### Initial Time Logic

1. **If `initialDate` includes time:**
   - Extract hour (0-23)
   - Derive AM/PM automatically
   - Display in 12-hour format

2. **If no `initialDate` or no time:**
   - Use current system time
   - Derive AM/PM from current hour

### Usage Examples

#### Basic 12-Hour Format
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true">
</hijri-gregorian-datepicker>
```

#### With Initial Time
```typescript
// Component
initialDate = new Date(2025, 11, 25, 14, 30); // 2:30 PM
```

```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true"
  [initialDate]="initialDate">
</hijri-gregorian-datepicker>
```
→ Displays: `02:30 PM`

#### 24-Hour Format (Default)
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="false">
</hijri-gregorian-datepicker>
```
→ Displays: `14:30` (no AM/PM)

### Output Format

**Important:** Output format does NOT change!

```json
{
  "gD": "25/12/2025",
  "time": {
    "hour": 14,    // Always 0-23 (24-hour format)
    "minute": 30
  }
}
```

The `hour` property is **always** in 24-hour format regardless of `useMeridian` setting.

### API Methods (Internal)

```typescript
// Get display hour (1-12 for meridian, 0-23 for 24-hour)
getDisplayHour(): number

// Toggle between AM and PM
toggleMeridian(): void

// Increment hour in 12-hour mode
incrementHour12(): void

// Decrement hour in 12-hour mode
decrementHour12(): void

// Handle 12-hour input (1-12)
onHour12InputChange(event: any): void
```

### UI Components

When `useMeridian = true`, an additional AM/PM button appears:

```
┌─────────────────────────────────────────┐
│              Time                       │
├─────────────────────────────────────────┤
│   Hour       Minute       AM/PM         │
│    ▲           ▲          ┌────┐       │
│  ┌────┐  :  ┌────┐        │ PM │       │
│  │ 02 │     │ 30 │        └────┘       │
│  └────┘     └────┘                     │
│    ▼           ▼                        │
└─────────────────────────────────────────┘
```

### Backward Compatibility Guarantees

✅ **Default behavior unchanged** (`useMeridian = false`)  
✅ **Output format unchanged** (always 24-hour internally)  
✅ **No breaking changes to API**  
✅ **Existing consumers work without modification**  
✅ **Meridian logic completely isolated**

---

## 📅 Feature 2: Range Selection Mode

### Purpose
Allow users to select a date range (start to end) with automatic highlighting of all dates in between.

### Input Property

```typescript
@Input() selectionMode: 'single' | 'range' = 'single';
```

**Default:** `'single'` (existing behavior)

### Behavior

#### When `selectionMode = 'single'` (Default):
- Single date selection
- **Exactly the same as before** ✅
- `multiple` input still works as before

#### When `selectionMode = 'range'`:
- First click → Sets **range start**
- Second click → Sets **range end**, highlights all dates in between
- Third click → **Resets range**, starts new selection

### Range Selection Lifecycle

```
User Action              State                     Visual
───────────────────────────────────────────────────────────
1. Click Dec 10          rangeStart = Dec 10       [10]
                         rangeEnd = null           

2. Click Dec 15          rangeStart = Dec 10       [10][11][12][13][14][15]
                         rangeEnd = Dec 15         (all highlighted)

3. Click Dec 20          rangeStart = Dec 20       [20]
                         rangeEnd = null           (previous range cleared)
                         (range reset)
```

### Edge Cases Handled

#### Reverse Selection (End Before Start)
```typescript
// User clicks Dec 15, then Dec 10
// System automatically swaps:
rangeStart = Dec 10  // Earlier date
rangeEnd = Dec 15    // Later date
```

#### Disabled Dates
- Disabled dates (by `minDate`/`maxDate`) cannot be selected
- Range cannot include disabled dates

#### Month/Calendar Switching
- Range state **persists** when switching months
- Range state **persists** when switching between Greg/Hijri

### Usage Examples

#### Basic Range Selection
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'">
</hijri-gregorian-datepicker>
```

#### Range Selection with Time
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true">
</hijri-gregorian-datepicker>
```

#### Range Selection with Constraints
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [minDate]="minDate"
  [maxDate]="maxDate">
</hijri-gregorian-datepicker>
```

```typescript
// Component
minDate = new Date(2025, 0, 1);  // Jan 1, 2025
maxDate = new Date(2025, 11, 31); // Dec 31, 2025
```

#### Range + 12-Hour Time
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true"
  [useMeridian]="true">
</hijri-gregorian-datepicker>
```

### Output Format

When `selectionMode = 'range'`, the output structure changes:

```json
{
  "start": {
    "gD": "10/12/2025",
    "uD": "08/06/1447",
    "selected": true,
    "time": { "hour": 14, "minute": 30 }
  },
  "end": {
    "gD": "15/12/2025",
    "uD": "13/06/1447",
    "selected": true,
    "time": { "hour": 14, "minute": 30 }
  },
  "dates": [
    { "gD": "10/12/2025", ... },
    { "gD": "11/12/2025", ... },
    { "gD": "12/12/2025", ... },
    { "gD": "13/12/2025", ... },
    { "gD": "14/12/2025", ... },
    { "gD": "15/12/2025", ... }
  ]
}
```

**Properties:**
- `start`: Range start date (DayInfo object)
- `end`: Range end date (DayInfo object)
- `dates`: Array of all dates in range (including start and end)

### Event Emissions

#### `onDaySelect` Event

**During range selection:**

```typescript
// First click (start selected)
{ start: DayInfo, end: null }

// Second click (range completed)
{ start: DayInfo, end: DayInfo }
```

#### `onSubmit` Event

**When confirm button clicked:**

```typescript
// Complete range
{
  start: DayInfo,
  end: DayInfo,
  dates: DayInfo[]
}

// Incomplete range (only start selected)
{
  start: DayInfo,
  end: null,
  dates: []
}
```

### API Methods (Internal)

```typescript
// Check if date is in selected range
isInRange(day: DayInfo): boolean

// Check if date is range start
isRangeStart(day: DayInfo): boolean

// Check if date is range end
isRangeEnd(day: DayInfo): boolean

// Reset range selection
private resetRange(): void

// Handle range selection logic
private handleRangeSelection(dayInfo: DayInfo): void

// Highlight all dates in range
private highlightRange(): void

// Parse date string to Date object for comparison
private parseDateString(dateStr: string): Date | null
```

### State Variables

```typescript
// BACKWARD COMPATIBILITY: Only used when selectionMode='range'
rangeStart?: DayInfo = undefined;
rangeEnd?: DayInfo = undefined;
```

These variables are **only active** when `selectionMode = 'range'`.

### Backward Compatibility Guarantees

✅ **Default behavior unchanged** (`selectionMode = 'single'`)  
✅ **Multiple selection still works** (via `multiple` input)  
✅ **Output format changes only in range mode**  
✅ **Range state isolated from single/multiple logic**  
✅ **No breaking changes to existing API**

---

## 🔄 Combined Usage

### All Features Together

```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true"
  [useMeridian]="true"
  [minDate]="minDate"
  [maxDate]="maxDate"
  [initialDate]="initialDate"
  [theme]="'Ocean Breeze'"
  (onSubmit)="handleSubmit($event)"
  (onDaySelect)="handleDaySelect($event)">
</hijri-gregorian-datepicker>
```

```typescript
export class MyComponent {
  minDate = new Date(2025, 0, 1);
  maxDate = new Date(2025, 11, 31);
  initialDate = new Date(2025, 11, 25, 14, 30);

  handleSubmit(event: any) {
    console.log('Range:', event);
    // {
    //   start: { gD: "10/12/2025", time: { hour: 14, minute: 30 } },
    //   end: { gD: "15/12/2025", time: { hour: 14, minute: 30 } },
    //   dates: [...]
    // }
  }

  handleDaySelect(event: any) {
    console.log('Day selected:', event);
  }
}
```

---

## 🧪 Testing Checklist

### AM/PM Tests

- [ ] With `useMeridian = false` → Shows 24-hour format (0-23)
- [ ] With `useMeridian = true` → Shows 12-hour format (1-12)
- [ ] AM/PM toggle button appears only when `useMeridian = true`
- [ ] Clicking AM/PM toggle switches correctly
- [ ] Midnight (00:00) displays as 12:00 AM
- [ ] Noon (12:00) displays as 12:00 PM
- [ ] Output always uses 24-hour format (0-23)
- [ ] Initial time correctly derives AM/PM from `initialDate`
- [ ] Current time correctly derives AM/PM

### Range Selection Tests

- [ ] With `selectionMode = 'single'` → Works exactly as before
- [ ] With `selectionMode = 'range'` → First click sets start
- [ ] Second click sets end and highlights range
- [ ] Third click resets and starts new range
- [ ] Reverse selection (end before start) swaps automatically
- [ ] Range persists when switching months
- [ ] Range persists when switching Greg/Hijri mode
- [ ] Disabled dates cannot be selected in range
- [ ] Output includes `start`, `end`, and `dates` array

### Combined Tests

- [ ] Range selection with time → Time attached to all dates
- [ ] Range selection with 12-hour time → Works correctly
- [ ] Range selection with min/max constraints → Respected

---

## 📊 Before & After Comparison

### Time Picker

| Aspect | Before | After |
|--------|--------|-------|
| **Hour Format** | 24-hour only | 24-hour OR 12-hour |
| **AM/PM Toggle** | Not available | Optional (useMeridian) |
| **Display Range** | 0-23 | 0-23 OR 1-12 + AM/PM |
| **Internal Storage** | 0-23 | 0-23 (unchanged) |
| **Output Format** | 24-hour | 24-hour (unchanged) |

### Selection Mode

| Aspect | Before | After |
|--------|--------|-------|
| **Selection Types** | Single, Multiple | Single, Multiple, **Range** |
| **Range Support** | None | Full support |
| **Output Format** | DayInfo or DayInfo[] | DayInfo, DayInfo[], or **RangeOutput** |
| **Range Highlighting** | N/A | Automatic |
| **Range Reset** | N/A | Third click |

---

## 🔧 Technical Implementation

### Files Modified

1. **hijri-gregorian-datepicker.component.ts**
   - Added `useMeridian` and `selectionMode` inputs
   - Added `meridian`, `rangeStart`, `rangeEnd` properties
   - Added 12-hour conversion methods
   - Added range selection methods
   - Updated `markDaySelected()` to handle range
   - Updated `onConfirmClicked()` to output range

2. **hijri-gregorian-datepicker.component.html**
   - Updated hour input to use `getDisplayHour()`
   - Updated hour buttons to use 12-hour methods conditionally
   - Added AM/PM toggle button
   - Conditional rendering with `*ngIf="useMeridian"`

3. **hijri-gregorian-datepicker.component.scss**
   - Added `.meridian-toggle` styles

### Code Architecture

**Isolation Principle:** All new logic is isolated and only activates when explicitly enabled:

```typescript
// Meridian logic only runs when useMeridian=true
if (this.useMeridian) {
  // 12-hour logic here
}

// Range logic only runs when selectionMode='range'
if (this.selectionMode === 'range') {
  // Range logic here
}
```

**No Impact on Defaults:** When inputs are at default values, code paths bypass new logic entirely.

---

## 🚀 Migration Guide

### For Existing Users

**No migration needed!** Both features are opt-in.

Existing code continues to work without any changes:

```html
<!-- This still works exactly as before -->
<hijri-gregorian-datepicker
  [enableTime]="true">
</hijri-gregorian-datepicker>
```

### To Enable New Features

Just add the new inputs:

```html
<!-- Enable 12-hour format -->
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true">
</hijri-gregorian-datepicker>

<!-- Enable range selection -->
<hijri-gregorian-datepicker
  [selectionMode]="'range'">
</hijri-gregorian-datepicker>
```

---

## 💡 Design Decisions

### Why Keep Internal 24-Hour Format?

- **Consistency:** Avoids breaking existing consumers
- **Simplicity:** No need to convert output
- **Compatibility:** Works with all backend systems
- **Standard:** ISO 8601 uses 24-hour format

### Why Reset Range on Third Click?

- **Clear intention:** User wants to start over
- **Intuitive:** Matches common UX patterns
- **Flexible:** Allows quick re-selection
- **Simple:** No need for "Clear" button

### Why Swap Start/End Automatically?

- **User-friendly:** No error messages needed
- **Flexible:** User can click in any order
- **Expected:** Matches date range pickers in other libraries

---

## 📝 Known Limitations

1. **Range selection** only works in single calendar view (not multiple instances)
2. **Meridian toggle** shows English "AM/PM" (Arabic translation: "م/ص")
3. **Range output** includes all dates in memory (could be large for multi-month ranges)

---

## 🎯 Future Enhancements (Not Implemented)

- [ ] Step size for minutes (5, 10, 15-minute intervals)
- [ ] Preset time buttons (Now, Morning, Noon, Evening)
- [ ] Second selector (HH:MM:SS)
- [ ] Multiple range selection
- [ ] Range with different times per date

---

**Implementation Date:** December 25, 2025  
**Status:** ✅ Complete  
**Breaking Changes:** ❌ None  
**New Dependencies:** ❌ None
