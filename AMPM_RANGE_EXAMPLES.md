# Quick Usage Examples - AM/PM & Range Selection

## 🕐 AM/PM Support Examples

### Example 1: Basic 12-Hour Format
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true">
</hijri-gregorian-datepicker>
```
**Result:** Time picker shows 1-12 hours with AM/PM toggle

---

### Example 2: 12-Hour Format with Initial Time
```typescript
// Component
initialDate = new Date(2025, 11, 25, 16, 45); // 4:45 PM
```

```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true"
  [initialDate]="initialDate">
</hijri-gregorian-datepicker>
```
**Result:** Time picker shows `04:45 PM`

---

### Example 3: 24-Hour Format (Default Behavior)
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="false">
</hijri-gregorian-datepicker>
```
**Result:** Time picker shows 0-23 hours (no AM/PM)

---

### Example 4: Output Always 24-Hour
```typescript
handleSubmit(event: any) {
  console.log(event.time);
  // Output: { hour: 16, minute: 45 }
  // Even though displayed as "04:45 PM"
}
```

---

## 📅 Range Selection Examples

### Example 1: Basic Range Selection
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'">
</hijri-gregorian-datepicker>
```

**User Actions:**
1. Click Dec 10 → Start selected
2. Click Dec 15 → Range complete (Dec 10-15 highlighted)
3. Click Dec 20 → Range resets, Dec 20 becomes new start

---

### Example 2: Range Selection with Output
```typescript
handleSubmit(event: any) {
  console.log(event);
  
  // Output:
  // {
  //   start: { gD: "10/12/2025", uD: "08/06/1447" },
  //   end: { gD: "15/12/2025", uD: "13/06/1447" },
  //   dates: [
  //     { gD: "10/12/2025", ... },
  //     { gD: "11/12/2025", ... },
  //     { gD: "12/12/2025", ... },
  //     { gD: "13/12/2025", ... },
  //     { gD: "14/12/2025", ... },
  //     { gD: "15/12/2025", ... }
  //   ]
  // }
}
```

---

### Example 3: Range with Date Constraints
```typescript
// Component
minDate = new Date(2025, 11, 1);  // Dec 1, 2025
maxDate = new Date(2025, 11, 31); // Dec 31, 2025
```

```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [minDate]="minDate"
  [maxDate]="maxDate">
</hijri-gregorian-datepicker>
```

**Result:** User can only select dates within December 2025

---

### Example 4: Range with Time
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true">
</hijri-gregorian-datepicker>
```

**Result:** Each date in range includes time
```json
{
  "start": { "gD": "10/12/2025", "time": { "hour": 9, "minute": 0 } },
  "end": { "gD": "15/12/2025", "time": { "hour": 9, "minute": 0 } },
  "dates": [...]
}
```

---

### Example 5: Reverse Selection
```
User clicks: Dec 15 (start) → Dec 10 (end)
System automatically swaps:
  start = Dec 10
  end = Dec 15
```

---

## 🎯 Combined Examples

### Example 1: Range + 12-Hour Time
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true"
  [useMeridian]="true">
</hijri-gregorian-datepicker>
```

**Result:** 
- Range selection enabled
- Time picker shows 1-12 with AM/PM
- Output has 24-hour format internally

---

### Example 2: Full Configuration
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true"
  [useMeridian]="true"
  [minDate]="minDate"
  [maxDate]="maxDate"
  [initialDate]="initialDate"
  [theme]="'Ocean Breeze'"
  [locale]="'en'"
  [mode]="'greg'"
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
    if (event.start && event.end) {
      console.log(`Range: ${event.start.gD} to ${event.end.gD}`);
      console.log(`Total days: ${event.dates.length}`);
      console.log(`Time: ${event.start.time.hour}:${event.start.time.minute}`);
    }
  }

  handleDaySelect(event: any) {
    if (event.end) {
      console.log('Range completed!');
    } else {
      console.log('Range start selected');
    }
  }
}
```

---

### Example 3: Arabic Locale with Range
```html
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true"
  [useMeridian]="true"
  [mode]="'ummAlQura'"
  [locale]="'ar'"
  [dir]="'rtl'">
</hijri-gregorian-datepicker>
```

**Result:**
- Hijri calendar
- Arabic labels
- RTL layout
- 12-hour time with "م/ص" (AM/PM in Arabic)

---

## 🔄 Migration Examples

### Before (Existing Code)
```html
<!-- This continues to work exactly as before -->
<hijri-gregorian-datepicker
  [enableTime]="true"
  [selectionMode]="'multiple'">
</hijri-gregorian-datepicker>
```

### After (New Features)
```html
<!-- Enable 12-hour format -->
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true"
  [selectionMode]="'multiple'">
</hijri-gregorian-datepicker>

<!-- OR switch to range mode -->
<hijri-gregorian-datepicker
  [enableTime]="true"
  [selectionMode]="'range'">
</hijri-gregorian-datepicker>
```

---

## 🧪 Testing Scenarios

### Scenario 1: Midnight Edge Case
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true"
  [initialDate]="midnightDate">
</hijri-gregorian-datepicker>
```

```typescript
midnightDate = new Date(2025, 11, 25, 0, 0); // 00:00
```

**Expected:** Displays `12:00 AM`  
**Output:** `{ hour: 0, minute: 0 }`

---

### Scenario 2: Noon Edge Case
```typescript
noonDate = new Date(2025, 11, 25, 12, 0); // 12:00
```

**Expected:** Displays `12:00 PM`  
**Output:** `{ hour: 12, minute: 0 }`

---

### Scenario 3: Range Across Months
```
User selects:
  Start: Nov 28, 2025
  End: Dec 5, 2025
```

**Result:** Range includes dates from both months

---

### Scenario 4: Single Day Range
```
User selects:
  Start: Dec 15, 2025
  End: Dec 15, 2025
```

**Result:** Valid range with only one date

---

## 💡 Tips & Tricks

### Tip 1: Programmatic Time Set
```typescript
// Set time programmatically
this.initialDate = new Date();
this.initialDate.setHours(14);
this.initialDate.setMinutes(30);
```

### Tip 2: Get Range Duration
```typescript
handleSubmit(event: any) {
  if (event.start && event.end) {
    const duration = event.dates.length;
    console.log(`Selected ${duration} days`);
  }
}
```

### Tip 3: Format Output Time
```typescript
handleSubmit(event: any) {
  if (event.time) {
    const hour12 = event.time.hour % 12 || 12;
    const meridian = event.time.hour >= 12 ? 'PM' : 'AM';
    const formatted = `${hour12}:${event.time.minute.toString().padStart(2, '0')} ${meridian}`;
    console.log(formatted); // e.g., "2:30 PM"
  }
}
```

### Tip 4: Validate Range Length
```typescript
handleSubmit(event: any) {
  if (event.dates && event.dates.length > 30) {
    alert('Please select a range of 30 days or less');
    return;
  }
}
```

---

## ⚠️ Common Mistakes

### Mistake 1: Expecting 12-Hour in Output
```typescript
// ❌ WRONG
if (event.time.hour === '2') // String comparison
if (event.time.hour === 2)   // 2 AM, not 2 PM!

// ✅ CORRECT
if (event.time.hour === 14)  // 2 PM in 24-hour format
```

### Mistake 2: Not Handling Incomplete Range
```typescript
// ❌ WRONG
handleSubmit(event: any) {
  console.log(event.end.gD); // May be null!
}

// ✅ CORRECT
handleSubmit(event: any) {
  if (event.end) {
    console.log(event.end.gD);
  } else {
    console.log('Range not complete');
  }
}
```

### Mistake 3: Conflicting Selection Modes
```html
<!-- ❌ WRONG: selectionMode already handles this -->
<hijri-gregorian-datepicker
  [selectionMode]="'range'"
  [enableTime]="true">
</hijri-gregorian-datepicker>

<!-- ✅ CORRECT: Use appropriate selectionMode -->
<hijri-gregorian-datepicker
  [selectionMode]="'multiple'">
</hijri-gregorian-datepicker>

<!-- OR -->
<hijri-gregorian-datepicker
  [selectionMode]="'range'">
</hijri-gregorian-datepicker>
```

---

## 📦 Default Values Summary

| Input | Type | Default | Effect |
|-------|------|---------|--------|
| `useMeridian` | boolean | `false` | 24-hour format |
| `selectionMode` | string | `'single'` | Single date selection |
| `enableTime` | boolean | `false` | No time picker |

All defaults maintain existing behavior! ✅
