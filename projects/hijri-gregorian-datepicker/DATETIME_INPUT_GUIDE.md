# DateTime Input Component - Usage Guide

## Overview

The `hijri-gregorian-datetime-input` component is a **new addition** to the package that provides an input field with a dropdown calendar picker. This component is built on top of the existing `hijri-gregorian-datepicker` component and adds form integration capabilities.

**Key Differences from Existing Component:**
- **Input Field**: Renders as a clickable input field (not always-visible calendar)
- **Dropdown Behavior**: Calendar appears in a dropdown panel when clicked
- **Form Integration**: Full ControlValueAccessor support for Reactive & Template-driven forms
- **Close on Outside Click**: Automatically closes when clicking outside
- **Bootstrap Styling**: Clean, modern Bootstrap-inspired design

## Installation

The component is already included when you import `HijriGregorianDatepickerModule`:

```typescript
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-date-time-picker';

@NgModule({
  imports: [
    HijriGregorianDatepickerModule,
    // ... other imports
  ],
})
export class AppModule {}
```

## Basic Usage

### 1. Template-Driven Forms (ngModel)

```html
<hijri-gregorian-datetime-input
  [(ngModel)]="selectedDate"
  [placeholder]="'Select date and time'"
  [enableTime]="true"
  (dateSelected)="onDateSelected($event)">
</hijri-gregorian-datetime-input>
```

```typescript
export class MyComponent {
  selectedDate: DayInfo;

  onDateSelected(date: DayInfo) {
    console.log('Selected:', date);
  }
}
```

### 2. Reactive Forms (FormControl)

```html
<form [formGroup]="myForm">
  <hijri-gregorian-datetime-input
    formControlName="appointmentDate"
    [placeholder]="'Select appointment date'"
    [enableTime]="true"
    [minDate]="minDate"
    [maxDate]="maxDate">
  </hijri-gregorian-datetime-input>
</form>
```

```typescript
export class MyComponent implements OnInit {
  myForm: FormGroup;
  minDate = new Date(2025, 0, 1); // Jan 1, 2025
  maxDate = new Date(2025, 11, 31); // Dec 31, 2025

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      appointmentDate: [null, Validators.required],
    });
  }

  onSubmit() {
    const value = this.myForm.value.appointmentDate;
    console.log('Selected Date:', value);
  }
}
```

## Configuration Options

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `'Select date and time'` | Input field placeholder text |
| `dateFormat` | `string` | `'DD/MM/YYYY'` | Display format for dates |
| `timeFormat` | `string` | `'HH:mm'` | Display format for time (24-hour) |
| `disabled` | `boolean` | `false` | Disable the input field |
| `enableTime` | `boolean` | `false` | Show time picker in calendar |
| `minDate` | `Date \| string` | `undefined` | Minimum selectable date |
| `maxDate` | `Date \| string` | `undefined` | Maximum selectable date |
| `initialDate` | `Date \| string` | `undefined` | Initial date when opening calendar |
| `mode` | `'greg' \| 'umm'` | `'greg'` | Calendar mode (Gregorian or Hijri) |
| `locale` | `'en' \| 'ar'` | `'en'` | Display language |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `showConfirmButton` | `boolean` | `true` | Show Confirm/Cancel buttons |
| `submitTextButton` | `string` | `'Confirm'` | Text for confirm button |
| `theme` | `string` | `''` | Theme name (e.g., 'Ocean Breeze') |
| `futureValidation` | `boolean` | `true` | Allow future dates |
| `markToday` | `boolean` | `true` | Highlight today's date |
| `todaysDateSection` | `boolean` | `true` | Show today's date section |
| `useMeridian` | `boolean` | `false` | Use 12-hour format with AM/PM |
| `amLabel` | `string` | `'AM'` | Label for AM in 12-hour format (translatable) |
| `pmLabel` | `string` | `'PM'` | Label for PM in 12-hour format (translatable) |
| `selectionMode` | `'single' \| 'range'` | `'single'` | Single date or range selection |
| `inputClass` | `string` | `''` | Custom CSS class for input |
| `dropdownClass` | `string` | `''` | Custom CSS class for dropdown |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `dateSelected` | `EventEmitter<DayInfo \| DayInfo[]>` | Emitted when date is confirmed |
| `dropdownOpened` | `EventEmitter<void>` | Emitted when dropdown opens |
| `dropdownClosed` | `EventEmitter<void>` | Emitted when dropdown closes |

## Advanced Examples

### Example 1: Date & Time Picker with Validation

```html
<hijri-gregorian-datetime-input
  [enableTime]="true"
  [minDate]="today"
  [futureValidation]="true"
  [useMeridian]="true"
  [placeholder]="'Select future date and time'"
  (dateSelected)="handleSelection($event)">
</hijri-gregorian-datetime-input>
```

```typescript
export class AppComponent {
  today = new Date();

  handleSelection(result: DayInfo) {
    console.log('Date:', result.gD);
    console.log('Time:', result.time); // { hour: 14, minute: 30 }
  }
}
```

### Example 2: Range Selection

```html
<hijri-gregorian-datetime-input
  [selectionMode]="'range'"
  [enableTime]="false"
  [placeholder]="'Select date range'"
  (dateSelected)="handleRangeSelection($event)">
</hijri-gregorian-datetime-input>
```

```typescript
export class AppComponent {
  handleRangeSelection(result: DayInfo[]) {
    if (result.length === 2) {
      console.log('Start:', result[0].gD);
      console.log('End:', result[1].gD);
    }
  }
}
```

### Example 3: Translatable AM/PM Labels (i18n)

**English (Default):**
```html
<hijri-gregorian-datetime-input
  [enableTime]="true"
  [useMeridian]="true"
  [amLabel]="'AM'"
  [pmLabel]="'PM'"
  [placeholder]="'Select date and time'">
</hijri-gregorian-datetime-input>
```

**Arabic:**
```html
<hijri-gregorian-datetime-input
  [enableTime]="true"
  [useMeridian]="true"
  [amLabel]="'ص'"
  [pmLabel]="'م'"
  [locale]="'ar'"
  [dir]="'rtl'"
  [placeholder]="'اختر التاريخ والوقت'">
</hijri-gregorian-datetime-input>
```

**Custom Labels:**
```html
<hijri-gregorian-datetime-input
  [enableTime]="true"
  [useMeridian]="true"
  [amLabel]="'Morning'"
  [pmLabel]="'Evening'"
  [placeholder]="'Select time'">
</hijri-gregorian-datetime-input>
```

### Example 4: Hijri Calendar Mode

```html
<hijri-gregorian-datetime-input
  [mode]="'umm'"
  [locale]="'ar'"
  [dir]="'rtl'"
  [placeholder]="'اختر التاريخ'"
  [enableTime]="true">
</hijri-gregorian-datetime-input>
```

### Example 4: Custom Styling

```html
<hijri-gregorian-datetime-input
  [inputClass]="'custom-input-class'"
  [dropdownClass]="'custom-dropdown-class'"
  [theme]="'Ocean Breeze'"
  [placeholder]="'Pick a date'">
</hijri-gregorian-datetime-input>
```

```scss
// In your component styles
::ng-deep .custom-input-class {
  border: 2px solid #007bff;
  border-radius: 8px;
}

::ng-deep .custom-dropdown-class {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
```

### Example 5: Programmatic Access

```typescript
import { ViewChild } from '@angular/core';
import { HijriGregorianDatetimeInputComponent } from 'angular-hijri-gregorian-date-time-picker';

export class MyComponent {
  @ViewChild(HijriGregorianDatetimeInputComponent)
  dateInput!: HijriGregorianDatetimeInputComponent;

  clearDate() {
    this.dateInput.clearValue();
  }

  openPicker() {
    this.dateInput.openDropdown();
  }

  getCurrentValue() {
    return this.dateInput.getValue();
  }
}
```

## Keyboard Accessibility

The component supports keyboard navigation:

- **Enter**: Open dropdown when input is focused
- **Escape**: Close dropdown
- **Tab**: Navigate between input and buttons

## Output Format

The component emits `DayInfo` objects (or arrays for range mode):

```typescript
interface DayInfo {
  gD: string;           // Gregorian date (DD/MM/YYYY)
  uD: string;           // Hijri date (DD/MM/YYYY)
  dN: string;           // Day name shorthand
  uC: number;           // Internal use
  selected?: boolean;   // Selection state
  disabled?: boolean;   // Disabled state
  time?: TimeValue;     // Time (if enableTime=true)
}

interface TimeValue {
  hour: number;         // 0-23
  minute: number;       // 0-59
}
```

### Single Selection Output:
```javascript
{
  gD: "15/06/2025",
  uD: "18/12/1446",
  dN: "Sun",
  uC: 0,
  selected: true,
  time: { hour: 14, minute: 30 }
}
```

### Range Selection Output:
```javascript
[
  { gD: "15/06/2025", uD: "18/12/1446", ... },
  { gD: "20/06/2025", uD: "23/12/1446", ... }
]
```

## Form Validation

The component works seamlessly with Angular form validation:

```typescript
this.myForm = this.fb.group({
  startDate: [null, [Validators.required]],
  endDate: [null, [Validators.required, this.dateAfterValidator()]],
});

dateAfterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = this.myForm?.get('startDate')?.value;
    const endDate = control.value;
    
    if (startDate && endDate) {
      // Custom validation logic
      return null; // valid
    }
    return { dateAfter: true }; // invalid
  };
}
```

## Styling

The component uses encapsulated styles with Bootstrap-inspired design. You can customize:

1. **Via Input Classes**: Use `inputClass` and `dropdownClass`
2. **Via Theme**: Use the `theme` property
3. **Via CSS Override**: Use `::ng-deep` (not recommended)

```scss
// Recommended: Use custom classes
<hijri-gregorian-datetime-input [inputClass]="'my-custom-input'">

.my-custom-input {
  /* Your custom styles */
}
```

## Comparison with Existing Component

| Feature | `hijri-gregorian-datepicker` | `hijri-gregorian-datetime-input` |
|---------|------------------------------|----------------------------------|
| Display | Always visible calendar | Input field + dropdown |
| Form Integration | EventEmitter only | ControlValueAccessor (full) |
| Close Behavior | N/A | Click outside, Escape key |
| Styling | Custom themes | Bootstrap + custom themes |
| Use Case | Embedded calendar view | Form field with picker |

## Migration Notes

**This is a NEW component** - no migration needed! Your existing `hijri-gregorian-datepicker` usage remains unchanged.

### When to use each component:

**Use `hijri-gregorian-datepicker`:**
- Need always-visible calendar
- Calendar is main UI element
- Custom embedded calendar views

**Use `hijri-gregorian-datetime-input`:**
- Form field with picker
- Limited space (dropdown)
- Standard input field behavior
- Form validation integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

The component follows WCAG 2.1 guidelines:
- Keyboard navigation support
- ARIA attributes (`aria-expanded`, `aria-haspopup`)
- Focus management
- Screen reader compatible

## Troubleshooting

### Issue: Dropdown not closing on outside click
**Solution**: Ensure proper DOM structure and no `stopPropagation()` calls

### Issue: Form value not updating
**Solution**: Check that `FormsModule` or `ReactiveFormsModule` is imported

### Issue: Styling conflicts
**Solution**: Use `inputClass` and `dropdownClass` instead of global styles

## License

MIT - Same as parent package
