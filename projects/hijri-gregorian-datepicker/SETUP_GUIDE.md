# Installation & Setup Guide

## Installation

```bash
npm install angular-hijri-gregorian-date-time-picker
```

## Required Setup After Installation

### **IMPORTANT:** Add Global Styles

The package includes fonts and icon fonts (Remix Icon) that need to be included in your project.

#### **Option 1: Import in angular.json (Recommended)**

Add the global styles to your `angular.json`:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.scss",
              "node_modules/angular-hijri-gregorian-date-time-picker/styles/global.scss"
            ]
          }
        }
      }
    }
  }
}
```

#### **Option 2: Import in your global styles.scss**

Add this import to your `src/styles.scss`:

```scss
@import 'angular-hijri-gregorian-date-time-picker/styles/global';
```

#### **Option 3: Direct CDN (Alternative)**

If you prefer not to bundle the styles, add this to your `index.html`:

```html
<head>
  <!-- Remix Icon for time picker arrows -->
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
```

---

## Module Import

Import the module in your `app.module.ts`:

```typescript
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-date-time-picker';

@NgModule({
  imports: [
    HijriGregorianDatepickerModule
  ]
})
export class AppModule { }
```

---

## Importing TypeScript Interfaces

Import `stylesConfig` and other interfaces:

```typescript
import { 
  stylesConfig, 
  DayInfo, 
  TimeValue 
} from 'angular-hijri-gregorian-date-time-picker';

// Use in your component
export class MyComponent {
  stylesConfig: stylesConfig = {
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif'
  };
}
```

---

## Usage Examples

### Basic DateTime Input

```html
<hijri-gregorian-datetime-input
  [(ngModel)]="selectedDate"
  [placeholder]="'Select date and time'"
  [enableTime]="true"
  [useMeridian]="true"
  [styles]="stylesConfig"
>
</hijri-gregorian-datetime-input>
```

### Always-Visible Calendar

```html
<hijri-gregorian-datepicker
  [mode]="'greg'"
  [enableTime]="true"
  [useMeridian]="true"
  [styles]="stylesConfig"
  (onSubmit)="onDateSelected($event)"
>
</hijri-gregorian-datepicker>
```

---

## Troubleshooting

### ❌ Fonts not showing

**Solution:** Make sure you've imported `global.scss` in `angular.json` or `styles.scss` as shown above.

### ❌ Clock icon (arrows) not showing in time picker

**Solution:** The library uses Remix Icon (`ri-arrow-drop-up-line`, `ri-arrow-drop-down-line`). Import `global.scss` or add Remix Icon CDN to your `index.html`.

### ❌ Cannot import `stylesConfig`

**Solution:** Make sure you're importing from the package:
```typescript
import { stylesConfig } from 'angular-hijri-gregorian-date-time-picker';
```

### ❌ Styles not applied after installation

**Solution:** 
1. Verify `global.scss` is imported
2. Restart your development server (`ng serve`)
3. Clear browser cache

---

## Custom Styling

### Using stylesConfig

```typescript
import { stylesConfig } from 'angular-hijri-gregorian-date-time-picker';

export class MyComponent {
  myStyles: stylesConfig = {
    // Main colors
    backgroundColor: '#ffffff',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    
    // Today's date
    todaysDateBgColor: '#e3f2fd',
    todaysDateTextColor: '#1976d2',
    
    // Time picker
    timePickerBgColor: '#f8f9fa',
    timePickerTextColor: '#212529',
    timePickerBorderColor: '#dee2e6',
    timePickerArrowColor: '#007bff',
    
    // Typography
    fontFamily: 'Poppins, sans-serif',
    borderRadius: '8px'
  };
}
```

### Custom Font

To use the included `Default-Regular` font:

```typescript
myStyles: stylesConfig = {
  fontFamily: 'Default-Regular, sans-serif'
};
```

---

## Assets Structure (After Installation)

After proper setup, your `node_modules` will contain:

```
node_modules/
  angular-hijri-gregorian-date-time-picker/
    ├── assets/
    │   └── fonts/
    │       └── Default-Regular.ttf
    ├── styles/
    │   └── global.scss       ← Import this!
    ├── fesm2022/
    ├── esm2022/
    └── package.json
```

---

## Example: Full Setup

**angular.json:**
```json
{
  "styles": [
    "src/styles.scss",
    "node_modules/angular-hijri-gregorian-date-time-picker/styles/global.scss"
  ]
}
```

**app.module.ts:**
```typescript
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-date-time-picker';

@NgModule({
  imports: [HijriGregorianDatepickerModule]
})
export class AppModule { }
```

**component.ts:**
```typescript
import { Component } from '@angular/core';
import { stylesConfig, DayInfo } from 'angular-hijri-gregorian-date-time-picker';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent {
  selectedDate?: DayInfo;
  
  stylesConfig: stylesConfig = {
    primaryColor: '#007bff',
    backgroundColor: '#ffffff'
  };
  
  onDateSelected(date: DayInfo) {
    console.log('Selected:', date);
  }
}
```

**component.html:**
```html
<hijri-gregorian-datetime-input
  [(ngModel)]="selectedDate"
  [placeholder]="'Select date'"
  [enableTime]="true"
  [styles]="stylesConfig"
  (dateSelected)="onDateSelected($event)"
>
</hijri-gregorian-datetime-input>
```

---

## Support

For issues, please visit: https://github.com/hanygamal72/angular-hijri-gregorian-date-time-picker/issues
