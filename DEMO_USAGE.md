# Demo Usage Examples

## Quick Demo in App Component

Add these examples to your `app.component.ts` and `app.component.html` to test the new features:

### app.component.ts

```typescript
import { Component } from '@angular/core';
import { DayInfo } from 'projects/hijri-gregorian-datepicker/src/_interfaces/calendar-model';
import { stylesConfig } from 'projects/hijri-gregorian-datepicker/src/_interfaces/styles-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Existing properties
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
  };
  mode = 'greg';

  // New properties for testing extended features
  enableTime = true;
  minDate = new Date(2025, 0, 1);    // Jan 1, 2025
  maxDate = new Date(2025, 11, 31);   // Dec 31, 2025
  initialDate = new Date(2025, 5, 15); // Jun 15, 2025

  constructor() {}

  // Existing methods
  onSubmit(ev: any) {
    console.log('On Submit:', ev);
    
    // Log time if present
    if (ev.time) {
      console.log('Selected Time:', `${ev.time.hour}:${ev.time.minute.toString().padStart(2, '0')}`);
    }
  }

  onChange(eventData: any) {
    console.log('On Change:', eventData);
    if (!Array.isArray(eventData)) {
      this.selectedDate = eventData;
    }
  }

  onMonthChangeTest(ev: any) {
    console.log('Month Changed:', ev);
  }

  onYearChangeTest(ev: any) {
    console.log('Year Changed:', ev);
  }

  toggleMode() {
    this.mode = this.mode == 'greg' ? 'ummAlQura' : 'greg';
  }

  // New method to toggle time picker
  toggleTimePicker() {
    this.enableTime = !this.enableTime;
  }
}
```

### app.component.html

Add these examples to test different feature combinations:

```html
<div class="demo-container">
  
  <!-- Example 1: Basic Datepicker (Existing) -->
  <div class="example">
    <h2>Example 1: Basic Datepicker</h2>
    <hijri-gregorian-datepicker
      [mode]="mode"
      [styles]="stylesConfig"
      (onSubmit)="onSubmit($event)"
      (onDaySelect)="onChange($event)"
      (onMonthChange)="onMonthChangeTest($event)"
      (onYearChange)="onYearChangeTest($event)">
    </hijri-gregorian-datepicker>
  </div>

  <!-- Example 2: With Time Picker -->
  <div class="example">
    <h2>Example 2: With Time Picker</h2>
    <button (click)="toggleTimePicker()">
      {{ enableTime ? 'Disable' : 'Enable' }} Time Picker
    </button>
    <hijri-gregorian-datepicker
      [mode]="mode"
      [enableTime]="enableTime"
      [styles]="stylesConfig"
      (onSubmit)="onSubmit($event)">
    </hijri-gregorian-datepicker>
  </div>

  <!-- Example 3: With Date Range Constraints -->
  <div class="example">
    <h2>Example 3: With Min/Max Date Constraints</h2>
    <p>Only dates in 2025 are selectable</p>
    <hijri-gregorian-datepicker
      [mode]="mode"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [styles]="stylesConfig"
      (onSubmit)="onSubmit($event)">
    </hijri-gregorian-datepicker>
  </div>

  <!-- Example 4: With Initial Date -->
  <div class="example">
    <h2>Example 4: With Initial Date</h2>
    <p>Opens at June 15, 2025</p>
    <hijri-gregorian-datepicker
      [mode]="mode"
      [initialDate]="initialDate"
      [styles]="stylesConfig"
      (onSubmit)="onSubmit($event)">
    </hijri-gregorian-datepicker>
  </div>

  <!-- Example 5: All Features Combined -->
  <div class="example">
    <h2>Example 5: All Features Combined</h2>
    <p>Time picker + Date range + Initial date</p>
    <button (click)="toggleMode()">
      Switch to {{ mode == 'greg' ? 'Hijri' : 'Gregorian' }}
    </button>
    <hijri-gregorian-datepicker
      [mode]="mode"
      [enableTime]="true"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [initialDate]="initialDate"
      [styles]="stylesConfig"
      (onSubmit)="onSubmit($event)"
      (onDaySelect)="onChange($event)">
    </hijri-gregorian-datepicker>
  </div>

  <!-- Example 6: String Format Dates -->
  <div class="example">
    <h2>Example 6: Using String Format Dates</h2>
    <p>minDate="01/01/2025", maxDate="30/06/2025"</p>
    <hijri-gregorian-datepicker
      [mode]="'greg'"
      [minDate]="'01/01/2025'"
      [maxDate]="'30/06/2025'"
      [initialDate]="'15/03/2025'"
      [styles]="stylesConfig"
      (onSubmit)="onSubmit($event)">
    </hijri-gregorian-datepicker>
  </div>

  <!-- Example 7: Hijri Mode with All Features -->
  <div class="example">
    <h2>Example 7: Hijri Mode with All Features</h2>
    <hijri-gregorian-datepicker
      [mode]="'ummAlQura'"
      [locale]="'ar'"
      [dir]="'rtl'"
      [enableTime]="true"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [initialDate]="initialDate"
      [styles]="stylesConfig"
      (onSubmit)="onSubmit($event)">
    </hijri-gregorian-datepicker>
  </div>

</div>
```

### app.component.scss

```scss
.demo-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;

  .example {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;

    h2 {
      margin-top: 0;
      color: #116466;
    }

    p {
      color: #666;
      font-size: 14px;
    }

    button {
      margin-bottom: 10px;
      padding: 8px 16px;
      background: #116466;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #0d4d4f;
      }
    }

    hijri-gregorian-datepicker {
      display: block;
      max-width: 400px;
      margin: 20px 0;
    }
  }
}
```

## Testing Checklist

Open your browser console and test:

1. **Basic Functionality** ✓
   - Select a date
   - Check console output

2. **Time Picker** ✓
   - Enable time picker
   - Select hours and minutes
   - Verify time in console output

3. **Min/Max Constraints** ✓
   - Try clicking disabled dates (before/after range)
   - Verify only dates in range are selectable

4. **Initial Date** ✓
   - Verify picker opens at June 15, 2025
   - Check month/year dropdowns are correct

5. **Mode Switching** ✓
   - Toggle between Gregorian and Hijri
   - Verify all features work in both modes

6. **Combined Features** ✓
   - Test all features together
   - Verify output includes all data

## Expected Console Output

When you select a date with time enabled:

```javascript
{
  gD: "15/06/2025",
  uD: "19/11/1446",
  dN: "Sun",
  uC: 29,
  selected: true,
  time: {
    hour: 14,
    minute: 30
  }
}
```

When you select a date without time:

```javascript
{
  gD: "15/06/2025",
  uD: "19/11/1446",
  dN: "Sun",
  uC: 29,
  selected: true
}
```

## Running the Demo

```bash
# In your project directory
npm start

# Or
ng serve

# Then open browser at http://localhost:4200
```
