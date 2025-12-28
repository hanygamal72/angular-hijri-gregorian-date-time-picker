# Angular Hijri Gregorian Date Time Picker

[![Build](https://img.shields.io/badge/build-passing-green.svg)](https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker)
[![npm version](https://img.shields.io/badge/npm-v1.5.0-blue.svg)](https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker)
[![Dependencies](https://img.shields.io/badge/dependencies-uptodate-green.svg)](https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker)

- Most accurate Hijri, Gregorian calendar(date-picker) on NPM with 100% accuracy percentage.
- Robust and tested code angular hijri/gregorian calendar/date-picker component for Angular 10 - 20+ projects.
- Ionic 3 - 4, 5, 6 + is supported, can be used in iOS and Android.
- `Zero` npm dependents package.
- 10 different `themes` and `layouts` already built in, you can also customize your own as well.
- **NEW:** Time picker with 12h/24h formats, Range selection, Beautiful custom selects, Bilingual typography

## Preview

<p>
  <img src="https://github.com/hanygamal72/angular-hijri-gregorian-date-time-picker/blob/master/src/assets/imgs/themes_en.gif" width="40%"/>
  <img src="https://github.com/hanygamal72/angular-hijri-gregorian-date-time-picker/blob/master/src/assets/imgs/themes_ar.gif" width="40%"/>
</p>

## ✨ What's New in v1.5.0

### 🎉 Major Features
- **⏰ Time Picker** - Full time selection with 12-hour/24-hour format support
- **📅 Range Selection** - Select date ranges with start and end dates
- **🎨 Beautiful Custom Selects** - Modern dropdown menus with smooth animations and Remix Icons
- **🌐 Bilingual Typography** - Google Fonts integration (Poppins for English, Zain for Arabic)
- **🎯 Initial Date Support** - Pre-select dates/ranges when calendar loads (`initialDate`, `initialRangeStart`, `initialRangeEnd`)

### 🚀 UI/UX Enhancements
- Redesigned year/month selectors with professional styling
- Enhanced RTL/LTR support with automatic font switching
- Improved accessibility with proper ARIA labels
- Smooth animations and transitions throughout
- Better mobile responsiveness

[See full CHANGELOG](https://github.com/hanygamal72/angular-hijri-gregorian-date-time-picker/blob/master/projects/hijri-gregorian-datepicker/CHANGELOG.md)

<br />

## Background

The Umm Al-Qura calendar is the lunar Hijri calendar officially adopted by Saudi Arabia for administrative purposes. It was originated from Umm Al-Qura newspaper, the official newspaper of government of Saudi Arabia. The newspaper is published weekly and its first issue was on Friday, 15 Jumada al-Ula 1343 AH (12 December 1924 CE). However, the calendar has been printed and distributed separately by the Saudi government since 1346 AH (1927 CE).

The calendar is widely used in Saudi Arabia, especially by the public sector. Official documents, political letters, health care records, and education certificates, are just examples of many other documents that are dated by the Hijri calendar.

However, the Gregorian calendar is the calendar used in most of the world, and it has been implemented as the default calendar in nearly every computer and database.

<b> Star it to inspire us to build the best component! </b>

## Features

- Can be used as a calendar or a datepicker with **time selection**.
- **RTL** and **LTR** support with **bilingual typography** (Poppins for English, Zain for Arabic)
- Easy to switch between **Gregorian** and **Hijri** calendars.
- Ability to specify the default calendar type either **Gregorian** or **Hijri**.
- Converting dates when changing type of calendar.
- Ability to specify min and max value for **Gregorian** and **Hijri**.
- Ability to make it required or readonly.
- Very easy to customize with **beautiful custom select dropdowns**.
- Can select **Single**, **Multiple** dates, or **Date Ranges**.
- **Time picker** with 12-hour/24-hour format support.
- **Initial date** and **initial range** support for pre-selecting dates.
- **Event listeners** for all datepicker events.
- Can customize future and past years number.
- **Responsive** design for web and mobile.
- **Modern UI** with Remix Icons and smooth animations.
- **Responsive** desing for web and mobile.

## Supported platforms

<b>Angular</b> 10 - 16, 18 +<br />
<b>Ionic</b> 3 - 4, 5, 6 +<br />
Mobile browsers and WebViews on: <b>Android</b> and <b>iOS</b><br />
Desktop browsers: <b>Chrome, Firefox, Safari, Edge v.79 +</b><br />
Other browsers: <b>Edge v.41 - 44</b> (without code hidden feature)

## Installation

    $ npm install angular-hijri-gregorian-date-time-picker

## Usage

Import `HijriGregorianDatepickerModule` in your app module or page module:

```ts
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-date-time-picker';

@NgModule({
  imports: [
    // ...
    HijriGregorianDatepickerModule
  ]
})
```

```html
<hijri-gregorian-datepicker
  [canChangeMode]="true"
  [todaysDateSection]="true"
  [futureValidation]="true"
  [disableYearPicker]="false"
  [disableMonthPicker]="false"
  [disableDayPicker]="false"
  [isRequired]="false"
  [showConfirmButton]="true"
  [markToday]="true"
  [mode]="'greg'"
  [dir]="'ltr'"
  [locale]="'en'"
  [submitTextButton]="'Confirm'"
  [todaysDateText]="'Today\'s Date'"
  [ummAlQuraDateText]="'التاريخ الهجرى'"
  [yearSelectLabel]="'Year'"
  [monthSelectLabel]="'Month'"
  [futureValidationMessageEn]="'Selected date cannot be in the future!'"
  [futureValidationMessageAr]="
    'التاريخ المحدد لا يمكن ان يكون في المستقبل!'
    "
  [pastYearsLimit]="90"
  [futureYearsLimit]="0"
  [theme]="'Midnight Blue'"
  [styles]="stylesConfig"
  (onSubmit)="onSubmit($event)"
  (onDaySelect)="onChange($event)"
  (onMonthChange)="onMonthChangeTest($event)"
  (onYearChange)="onYearChangeTest($event)"
></hijri-gregorian-datepicker>
```

Inside your component.ts:

```ts
  // this called every time when user confirms a selected date
    onSubmitEvent(code: string) {
    }

    // this called only every time the use selects a date
    onChangeEvent(code: string) {
    }

    // this called every time the month value channges
    onMonthChangeEvent(code: string) {
    }

    // this called every time the year value channges
    onYearChangeEvent(code: string) {
    }
```

## @Inputs()

| Property                           |  Type   |                    Default                    | Description                                                                                                      |
| ---------------------------------- | :-----: | :-------------------------------------------: | ---------------------------------------------------------------------------------------------------------------- |
| <b>`canChangeMode`</b>             | boolean |                    `true`                     | When `true` the user can toggle calendar modes, if `false` the user has only one calendar mode                   |
| <b>`todaysDateSection`</b>         | boolean |                    `true`                     | When `true` the section with current today date will be shown, if `false` it will be hidden                      |
| <b>`futureValidation`</b>          | boolean |                    `true`                     | When `true` the user cannot choose any future dates, if `false` user can select future dates                     |
| <b>`disableYearPicker`</b>         | boolean |                    `false`                    | When `true` the user cannot select different years, if `false` year select will be enabled                       |
| <b>`disableMonthPicker`</b>        | boolean |                    `false`                    | When `true` the user cannot select different months, if `false` month select will be enabled                     |
| <b>`disableDayPicker`</b>          | boolean |                    `false`                    | When `true` the user cannot select days, if `false` days select will be enabled                                  |
| <b>`isRequired`</b>                | boolean |                    `true`                     | When `true` the confirm button will be disabled until user selects a date, if `false` the button will be enabled |
| <b>`showConfirmButton`</b>         | boolean |                    `true`                     | When `true` the confirm button will be displayed, if `false` it will be hidden                                   |
| <b>`markToday`</b>                 | boolean |                    `true`                     | When `true` today date will be marked(bordered), if `false` it will not be marked                                |
| <b>`mode`</b>                      | string  |                    `greg`                     | Calendar mode, either `ummAlQura` or `greg`                                                                      |
| <b>`dir`</b>                       | string  |                     `ltr`                     | Layout direction, either `ltr` or `rtl`                                                                          |
| <b>`locale`</b>                    | string  |                     `en`                      | The language of the calendar layout, either `ar` or `en`                                                         |
| <b>`submitTextButton`</b>          | string  |                   `Confirm`                   | Confirm button text value                                                                                        |
| <b>`todaysDateText`</b>            | string  |               `Todays\'s Date`                | Today's date text in `todaysDateSection`                                                                         |
| <b>`ummAlQuraDateText`</b>         | string  |               `التاريخ الهجرى`                | Text next to checkbox to toggle date `todaysDateSection`                                                         |
| <b>`yearSelectLabel`</b>           | string  |                    `Year`                     | Label of the year select option                                                                                  |
| <b>`monthSelectLabel`</b>          | string  |                    `Month`                    | Label of the month select option                                                                                 |
| <b>`futureValidationMessageEn`</b> | string  |   `Selected date cannot be in the future!`    | English future validation message if `futureValidation` is set to `true`                                         |
| <b>`futureValidationMessageAr`</b> | string  | `التاريخ المحدد لا يمكن ان يكون في المستقبل!` | Arabic future validation message if `futureValidation` is set to `true`                                          |
| <b>`pastYearsLimit`</b>            | number  |                     `90`                      | indicates for the past years number you want to allow user to select from                                        |
| <b>`futureYearsLimit`</b>          | number  |                      `0`                      | indicates for the future years number you want to allow user to select from                                      |
| <b>`selectionMode`</b>             | string  |                   `single`                    | Date selection mode, either `single` for single date selection or `range` for date range selection                |
| <b>`initialDate`</b>               | Date    |                    `null`                     | Initial date to be selected/highlighted when calendar opens (for single selection mode)                           |
| <b>`initialRangeStart`</b>         | Date    |                    `null`                     | Initial start date for range selection (for range selection mode)                                                 |
| <b>`initialRangeEnd`</b>           | Date    |                    `null`                     | Initial end date for range selection (for range selection mode)                                                   |
| <b>`minDate`</b>                   | Date    |                    `null`                     | Minimum selectable date - dates before this will be disabled                                                      |
| <b>`maxDate`</b>                   | Date    |                    `null`                     | Maximum selectable date - dates after this will be disabled                                                       |
| <b>`useMeridian`</b>               | boolean |                    `true`                     | When `true` the time picker uses 12-hour format with AM/PM, if `false` uses 24-hour format                        |
| <b>`styles`</b>                    | object  |                     `{}`                      | Styles for the calendar look and feel                                                                            |
| <b>`theme`</b>                     | string  |                     `Midnight Blue`           | Different skins and themes for the calendar('Ocean Breeze', 'Lavender Dreams', 'Sunset Glow', 'Midnight Blue', 'Forest Canopy', 'Rosewood Elegance', 'Icy Mint', 'Golden Sand', 'Steel Grey', 'Coral Reef'), and it has priority over styles

## Styles

| Property                     |  Type  |      Default      | Description                                                          |
| ---------------------------- | :----: | :---------------: | -------------------------------------------------------------------- |
| <b>`backgroundColor`</b>     | string |     `#E3F6F5`     | Background of the calendar                                           |
| <b>`primaryColor`</b>        | string |     `#272343`     | Color of the today's date, year and month texts                      |
| <b>`secondaryColor`</b>      | string |     `#272343`     | Background of submit button and selected days in calendar            |
| <b>`todaysDateBgColor`</b>   | string |     `#272343`     | Background of "today's date" date section                            |
| <b>`todaysDateTextColor`</b> | string |      `#fff`       | Color of "today's date" date section text                            |
| <b>`confirmBtnTextColor`</b> | string |      `#fff`       | Color of "Confirm" button text                                       |
| <b>`disabledDayColor`</b>    | string |     `#C0C0C0`     | Disabled days text color                                             |
| <b>`dayNameColor`</b>        | string |     `#0d7f91`     | Day names text color                                                 |
| <b>`dayColor`</b>            | string |      `#000`       | Enabled days text color                                              |
| <b>`fontFamily`</b>          | string | `Default-Regular` | Font family of the font used globally and pre defined within project |
| <b>`borderRadius`</b>        | string |       `8px`       | Border radius of the each div and button in the calendar layout      |
| <b>`timePickerBgColor`</b>   | string |     `#ffffff`     | Background color for time input fields                               |
| <b>`timePickerTextColor`</b> | string |      `#333`       | Text color for time display                                          |
| <b>`timePickerBorderColor`</b> | string |      `#ddd`       | Border color for time inputs                                         |
| <b>`timePickerArrowColor`</b> | string |     `#5b479c`     | Color for up/down arrow icons                                        |
| <b>`timePickerColonColor`</b> | string |     `#5b479c`     | Color for colon separator                                            |
| <b>`meridianBgColor`</b>     | string |     `#ffffff`     | Background color for AM/PM buttons                                   |
| <b>`meridianTextColor`</b>   | string |      `#666`       | Text color for AM/PM buttons                                         |
| <b>`meridianActiveBgColor`</b> | string | `rgb(0, 77, 97)` | Background color for active AM/PM button                             |
| <b>`meridianActiveTextColor`</b> | string |     `#ffffff`     | Text color for active AM/PM button                                   |

## @Outputs()

| Output          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `onSubmit`      | Will be called every time when a user submits a selected date |
| `onDaySelect`   | Will be called every time when a user selects new date        |
| `onMonthChange` | Will be called every time the month value changes             |
| `onYearChange`  | Will be called every time the year value changes              |

## Helper Functions

import { DateUtilitiesService } from '../_services/date-utilities.service';

```ts
  constructor(private _dateUtils: DateUtilitiesService) {

  }

```

| Output                         | Description                                                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| <b>`convertDate`</b>           | Converts dates from Gregorian to Umm Al Qura and vice versa                                                                            |
| <b>`checkPastOrFuture`</b>     | Checks date whether it's future or past date('Future', 'Past', 'Today')                                                                |
| <b>`formatDate`</b>            | Converts date from human-readable string representation(ex. Mon Sep 05 2023 15:30:45 GMT+0200) to separated "/" string(ex. 05/09/2023) |
| <b>`parseDate`</b>             | The opposite of `formateDate` function                                                                                                 |
| <b>`getGregorianMonthData`</b> | Generates an array of objects of Gregorian month passed to it                                                                          |
| <b>`getUmAlQurraMonthData`</b> | Generates an array of objects of Umm Al Qura month passed to it                                                                        |

## Contributing

Contributions are more than welcome!

## License

MIT License

Copyright (c) 2022 Muhammad Hanafi, Imad Khan
