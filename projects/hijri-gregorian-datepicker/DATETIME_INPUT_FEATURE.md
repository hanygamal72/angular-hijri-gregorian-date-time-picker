# 🎉 New Feature: DateTime Input Component

## Summary

A **new component** has been added to the package: `hijri-gregorian-datetime-input`

This component provides an **input field with dropdown calendar picker**, perfect for forms and limited-space UIs.

## What's New?

### DateTime Input Component (`hijri-gregorian-datetime-input`)

**Key Features:**
- ✅ Renders as an INPUT field (not always-visible calendar)
- ✅ Dropdown panel with calendar on click
- ✅ Full ControlValueAccessor support (Reactive & Template-driven forms)
- ✅ Click outside to close
- ✅ Escape key to close
- ✅ Confirm/Cancel buttons
- ✅ Bootstrap-inspired styling
- ✅ Min/Max date validation
- ✅ Time picker support
- ✅ Range selection mode
- ✅ RTL support
- ✅ Accessibility (keyboard navigation)
- ✅ Customizable styling

**Backward Compatibility:**
- ✅ 100% backward compatible
- ✅ Existing `hijri-gregorian-datepicker` component unchanged
- ✅ No breaking changes
- ✅ Zero migration required for existing users

## Quick Start

### 1. Installation
```bash
npm install angular-hijri-gregorian-date-time-picker
```

### 2. Import Module
```typescript
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-date-time-picker';

@NgModule({
  imports: [
    HijriGregorianDatepickerModule,
  ],
})
export class AppModule {}
```

### 3. Use in Template

**Template-driven Forms:**
```html
<hijri-gregorian-datetime-input
  [(ngModel)]="selectedDate"
  [placeholder]="'Select date and time'"
  [enableTime]="true"
  (dateSelected)="onDateSelected($event)">
</hijri-gregorian-datetime-input>
```

**Reactive Forms:**
```html
<form [formGroup]="myForm">
  <hijri-gregorian-datetime-input
    formControlName="appointmentDate"
    [enableTime]="true"
    [minDate]="minDate"
    [maxDate]="maxDate">
  </hijri-gregorian-datetime-input>
</form>
```

## Component Comparison

| Feature | `hijri-gregorian-datepicker` | `hijri-gregorian-datetime-input` (NEW) |
|---------|------------------------------|----------------------------------------|
| **Display** | Always visible calendar | Input field + dropdown |
| **Use Case** | Embedded calendar view | Form field with picker |
| **Form Integration** | EventEmitter only | ✅ ControlValueAccessor |
| **Space Required** | Large (always visible) | Compact (dropdown) |
| **Close Behavior** | N/A | Click outside, Escape |
| **Styling** | Custom themes | Bootstrap + themes |
| **Best For** | Calendar-centric UI | Forms and inputs |

## Configuration Options

### Common Inputs

```typescript
// Basic
[placeholder]="'Select date'"          // Input placeholder
[disabled]="false"                     // Disable input
[enableTime]="true"                    // Show time picker

// Validation
[minDate]="minDate"                    // Minimum date
[maxDate]="maxDate"                    // Maximum date
[futureValidation]="true"              // Allow future dates

// Calendar Mode
[mode]="'greg'"                        // 'greg' or 'umm' (Hijri)
[locale]="'en'"                        // 'en' or 'ar'
[dir]="'ltr'"                          // 'ltr' or 'rtl'

// Time Settings
[useMeridian]="false"                  // 12-hour format with AM/PM

// Selection Mode
[selectionMode]="'single'"             // 'single' or 'range'

// Styling
[theme]="'Ocean Breeze'"               // Theme name
[inputClass]="'custom-input'"          // Custom CSS for input
[dropdownClass]="'custom-dropdown'"    // Custom CSS for dropdown
```

### Output Events

```typescript
(dateSelected)="onDateSelected($event)"  // When date confirmed
(dropdownOpened)="onOpen()"              // When dropdown opens
(dropdownClosed)="onClose()"             // When dropdown closes
```

## Architecture & Design

### Design Principles

1. **Reusability**: Wraps existing `hijri-gregorian-datepicker` component
2. **No Breaking Changes**: Existing component remains 100% unchanged
3. **Clean Separation**: New component in separate file
4. **Standard Patterns**: Implements ControlValueAccessor
5. **Encapsulated Styles**: No global style leaks

### File Structure

```
projects/hijri-gregorian-datepicker/src/lib/
├── hijri-gregorian-datepicker.component.ts        # Existing (unchanged)
├── hijri-gregorian-datepicker.component.html      # Existing (unchanged)
├── hijri-gregorian-datepicker.component.scss      # Existing (unchanged)
├── hijri-gregorian-datetime-input.component.ts    # NEW
├── hijri-gregorian-datetime-input.component.html  # NEW
├── hijri-gregorian-datetime-input.component.scss  # NEW
└── hijri-gregorian-datepicker.module.ts           # Updated (exports new component)
```

### Technical Implementation

**ControlValueAccessor:**
- ✅ Implements `writeValue()`
- ✅ Implements `registerOnChange()`
- ✅ Implements `registerOnTouched()`
- ✅ Implements `setDisabledState()`

**Dropdown Management:**
- Uses native positioning (no CDK required)
- Document click listener for outside clicks
- Escape key handler
- Proper z-index management

**Form Integration:**
- Works with `ngModel`
- Works with `formControlName`
- Supports validators
- Emits proper change events

## Examples

### Example 1: Simple Date Picker
```html
<hijri-gregorian-datetime-input
  [(ngModel)]="date"
  [placeholder]="'Select date'">
</hijri-gregorian-datetime-input>
```

### Example 2: Date & Time with Validation
```html
<hijri-gregorian-datetime-input
  [(ngModel)]="appointmentDate"
  [enableTime]="true"
  [minDate]="today"
  [futureValidation]="true"
  [placeholder]="'Select future appointment'">
</hijri-gregorian-datetime-input>
```

### Example 3: Range Selection
```html
<hijri-gregorian-datetime-input
  [(ngModel)]="dateRange"
  [selectionMode]="'range'"
  [placeholder]="'Select date range'">
</hijri-gregorian-datetime-input>
```

### Example 4: Hijri Calendar
```html
<hijri-gregorian-datetime-input
  [(ngModel)]="hijriDate"
  [mode]="'umm'"
  [locale]="'ar'"
  [dir]="'rtl'"
  [placeholder]="'اختر التاريخ'">
</hijri-gregorian-datetime-input>
```

### Example 5: Reactive Form
```typescript
export class AppComponent {
  form = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}
}
```

```html
<form [formGroup]="form">
  <hijri-gregorian-datetime-input
    formControlName="startDate"
    [enableTime]="true">
  </hijri-gregorian-datetime-input>

  <hijri-gregorian-datetime-input
    formControlName="endDate"
    [enableTime]="true">
  </hijri-gregorian-datetime-input>

  <button [disabled]="form.invalid">Submit</button>
</form>
```

## Output Format

The component emits `DayInfo` objects:

```typescript
// Single selection
{
  gD: "28/12/2025",           // Gregorian date
  uD: "27/06/1447",           // Hijri date
  dN: "Sat",                  // Day name
  uC: 0,
  selected: true,
  time: {                     // If enableTime=true
    hour: 14,
    minute: 30
  }
}

// Range selection
[
  { gD: "28/12/2025", ... },  // Start date
  { gD: "31/12/2025", ... }   // End date
]
```

## Styling

### Default Bootstrap Styling

The component uses Bootstrap-inspired styles by default:
- Clean, modern input field
- Smooth dropdown animations
- Professional color scheme
- Responsive design

### Custom Styling

**Method 1: Input Classes**
```html
<hijri-gregorian-datetime-input
  [inputClass]="'my-input'"
  [dropdownClass]="'my-dropdown'">
</hijri-gregorian-datetime-input>
```

```scss
.my-input {
  border: 2px solid #007bff;
  border-radius: 8px;
}

.my-dropdown {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
```

**Method 2: Theme**
```html
<hijri-gregorian-datetime-input
  [theme]="'Ocean Breeze'">
</hijri-gregorian-datetime-input>
```

## Accessibility

The component follows WCAG 2.1 guidelines:

**Keyboard Navigation:**
- `Enter` - Open dropdown
- `Escape` - Close dropdown
- `Tab` - Navigate between elements

**ARIA Attributes:**
- `aria-expanded` - Dropdown state
- `aria-haspopup` - Indicates popup
- `aria-label` - Descriptive labels

**Screen Readers:**
- Proper semantic HTML
- Descriptive labels
- State announcements

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

**Optimizations:**
- Lazy rendering (dropdown only when open)
- Encapsulated styles
- Minimal DOM manipulation
- Efficient change detection

## Migration Guide

**No migration needed!** This is a new component.

### When to Use Each Component

**Use `hijri-gregorian-datepicker` when:**
- Calendar is the main UI element
- Need always-visible calendar
- Building custom calendar views
- Calendar-centric applications

**Use `hijri-gregorian-datetime-input` when:**
- Building forms
- Need compact date picker
- Want standard input field behavior
- Need ControlValueAccessor
- Limited space available

## Troubleshooting

### Issue: ngModel not working
**Solution:** Import `FormsModule` in your module:
```typescript
import { FormsModule } from '@angular/forms';
```

### Issue: formControlName not working
**Solution:** Import `ReactiveFormsModule` in your module:
```typescript
import { ReactiveFormsModule } from '@angular/forms';
```

### Issue: Dropdown not closing
**Solution:** Ensure no `stopPropagation()` on parent elements

### Issue: Styles not applied
**Solution:** Use `inputClass` and `dropdownClass` properties

## Documentation

- 📚 [Full Documentation](./DATETIME_INPUT_GUIDE.md)
- 📦 [NPM Package](https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker)
- 🐙 [GitHub Repository](https://github.com/hanygamal72/angular-hijri-gregorian-date-time-picker)

## License

MIT - Same as parent package

## Credits

Built on top of the existing `hijri-gregorian-datepicker` component by Hany Gamal.

New DateTime Input Component maintains the same high quality and features while adding modern form integration.

---

**Ready to use!** Import the module and start building forms with the new DateTime Input Component. 🚀
