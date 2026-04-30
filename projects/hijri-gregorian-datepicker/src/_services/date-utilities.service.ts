import { Injectable } from '@angular/core';
import * as datesDictionary from '../_data/dictionary.json';
import { Data, DayInfo, MonthDays } from '../_interfaces/calendar-model';

@Injectable({
  providedIn: 'root',
})
export class DateUtilitiesService {
  public calendarData: Data;

  constructor() {
    this.calendarData = (datesDictionary as any)['default'];
  }

  parseDate(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }
    const parts = dateStr?.split('/');
    if (parts.length !== 3) {
      return null;
    }
    const [day, month, year] = parts.map(Number);
    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1
    ) {
      return null;
    }
    return new Date(year, month - 1, day);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Format date string according to specified format pattern
   * Supported formats: 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'YYYY-MM-DD', 'DD-MM-YYYY', 'MM-DD-YYYY'
   * @param dateStr - Date string in DD/MM/YYYY format
   * @param format - Desired output format pattern
   * @returns Formatted date string
   */
  formatDateString(dateStr: string, format: string = 'DD/MM/YYYY'): string {
    if (!dateStr) return '';

    const parts = dateStr.split('/');
    if (parts.length !== 3) return dateStr;

    const [day, month, year] = parts;

    // Determine separator from format
    const separator = format.includes('-') ? '-' : '/';

    // Build date according to format pattern
    const formatUpper = format.toUpperCase().replace(/[-/]/g, '/');

    switch (formatUpper) {
      case 'DD/MM/YYYY':
        return `${day}${separator}${month}${separator}${year}`;
      case 'MM/DD/YYYY':
        return `${month}${separator}${day}${separator}${year}`;
      case 'YYYY/MM/DD':
        return `${year}${separator}${month}${separator}${day}`;
      case 'YYYY/DD/MM':
        return `${year}${separator}${day}${separator}${month}`;
      case 'DD/YYYY/MM':
        return `${day}${separator}${year}${separator}${month}`;
      case 'MM/YYYY/DD':
        return `${month}${separator}${year}${separator}${day}`;
      default:
        // Default to DD/MM/YYYY
        return `${day}${separator}${month}${separator}${year}`;
    }
  }

  getDayShortHand(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'short' });
  }

  generateDates(fD: DayInfo, lD: DayInfo, uC: number): MonthDays {
    const startDate = this.parseDate(fD?.gD);
    const endDate = this.parseDate(lD?.gD);
    const daysInMonth: MonthDays = [];
    let currentGregorianDate = new Date(startDate);
    let currentUmmAlQuraDay = parseInt(fD?.uD?.split('/')[0]);
    let currentUmmAlQuraMonth = parseInt(fD?.uD?.split('/')[1]);
    let currentUmmAlQuraYear = parseInt(fD?.uD?.split('/')[2]);
    let daysInCurrentUmmAlQuraMonth = uC;

    while (currentGregorianDate <= endDate) {
      const ummAlQuraDate = `${currentUmmAlQuraDay
        .toString()
        .padStart(2, '0')}/${currentUmmAlQuraMonth
        .toString()
        .padStart(2, '0')}/${currentUmmAlQuraYear}`;
      daysInMonth.push({
        gD: this.formatDate(currentGregorianDate),
        uD: ummAlQuraDate,
        dN: this.getDayShortHand(currentGregorianDate),
        uC: 0,
      });

      // Increment date and normalize time to avoid DST issues
      currentGregorianDate.setDate(currentGregorianDate.getDate() + 1);
      currentGregorianDate.setHours(0, 0, 0, 0); // Normalize to midnight

      currentUmmAlQuraDay += 1;
      if (currentUmmAlQuraDay > daysInCurrentUmmAlQuraMonth) {
        currentUmmAlQuraDay = 1;
        currentUmmAlQuraMonth += 1;
        if (currentUmmAlQuraMonth > 12) {
          currentUmmAlQuraMonth = 1;
          currentUmmAlQuraYear += 1;
        }
        const nextMonthData =
          this.calendarData[currentUmmAlQuraYear.toString()]?.[
            currentUmmAlQuraMonth.toString()
          ];
        daysInCurrentUmmAlQuraMonth = nextMonthData ? nextMonthData.fD.uC : 30;
      }
    }
    return daysInMonth;
  }

  /**
   * Convert date between Gregorian and Hijri calendars
   * Accepts any common date format and automatically normalizes it
   * @param dateStr - Input date string in any common format
   * @param isGregorian - True if input is Gregorian, false if Hijri (optional - auto-detected if not provided)
   * @returns DayInfo object with both Gregorian and Hijri dates, or null if invalid
   */
  convertDate(dateStr: string, isGregorian?: boolean): DayInfo | null {
    if (!dateStr) return null;

    // Step 1: Normalize the input date to handle any format
    const normalizedResult = this.normalizeDate(dateStr);
    if (!normalizedResult) return null;

    const { normalized, isGregorian: detectedIsGregorian } = normalizedResult;

    // Use provided isGregorian flag, or fall back to auto-detected value
    const isGregorianDate = isGregorian !== undefined ? isGregorian : detectedIsGregorian;

    if (isGregorianDate) {
      // Process Gregorian date (normalized format: YYYY/MM/DD)
      // Convert to DD/MM/YYYY for parseDate compatibility
      const [year, month, day] = normalized.split('/');
      const ddmmyyyy = `${day}/${month}/${year}`;

      const gregorianDate = this.parseDate(ddmmyyyy);
      if (!gregorianDate) return null;
      const formattedDate = this.formatDate(gregorianDate);

      // Extract year and month for direct lookup (remove leading zeros from month)
      const [, monthStr, yearStr] = formattedDate.split('/');
      const monthKey = String(Number(monthStr)); // Remove leading zero: "04" -> "4"

      // Try direct lookup first (much faster)
      if (this.calendarData[yearStr] && this.calendarData[yearStr][monthKey]) {
        const monthData = this.calendarData[yearStr][monthKey];

        if (
          this.isDateInMonthRange(
            formattedDate,
            monthData.fD?.gD,
            monthData.lD?.gD,
          )
        ) {
          const daysInMonth = this.generateDates(
            monthData.fD,
            monthData.lD,
            monthData.fD?.uC,
          );

          const dayMatch = daysInMonth.find((d) => d.gD === formattedDate);
          if (dayMatch) return dayMatch;
        }
      }

      // Fallback: search all years and months if direct lookup fails
      for (const yearKey in this.calendarData) {
        for (const monthKey in this.calendarData[yearKey]) {
          const monthData = this.calendarData[yearKey][monthKey];

          if (
            this.isDateInMonthRange(
              formattedDate,
              monthData.fD?.gD,
              monthData.lD?.gD,
            )
          ) {
            const daysInMonth = this.generateDates(
              monthData.fD,
              monthData.lD,
              monthData.fD?.uC,
            );

            const dayMatch = daysInMonth.find((d) => d.gD === formattedDate);
            if (dayMatch) return dayMatch;
          }
        }
      }
    } else {
      // Process Hijri date (normalized format: DD/MM/YYYY)
      const [day, month, year] = normalized.split('/').map(Number);

      if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

      // Search through calendar data to find matching Hijri date
      for (const yearKey in this.calendarData) {
        for (const monthKey in this.calendarData[yearKey]) {
          const monthData = this.calendarData[yearKey][monthKey];

          if (
            this.isDateInMonthRange(
              `${day}/${month}/${year}`,
              monthData.fD?.uD,
              monthData.lD?.uD,
            )
          ) {
            const daysInMonth = this.generateDates(
              monthData.fD,
              monthData.lD,
              monthData.fD?.uC,
            );

            const dayMatch = daysInMonth.find((d) => {
              const [uDay, uMonth, uYear] = d?.uD?.split('/').map(Number);
              return uDay === day && uMonth === month && uYear === year;
            });

            if (dayMatch) return dayMatch;
          }
        }
      }
    }

    return null;
  }

  private isDateInMonthRange(
    dateToCheck: string,
    monthStartDate: string | undefined,
    monthEndDate: string | undefined,
  ): boolean {
    if (!monthStartDate || !monthEndDate) return false;

    const checkDate = this.parseDate(dateToCheck);
    const startDate = this.parseDate(monthStartDate);
    const endDate = this.parseDate(monthEndDate);

    if (!checkDate || !startDate || !endDate) return false;

    return checkDate >= startDate && checkDate <= endDate;
  }

  getMonthData(inputDate: string, type: string): DayInfo[] | null {
    if (!inputDate) return null;
    const [day, month, year] = inputDate.split('/').map(Number);
    let isGregorian: boolean;
    if (type == 'greg') {
      isGregorian = true;
    } else {
      isGregorian = false;
    }
    if (isGregorian) {
      return this.getGregorianMonthData(day, month, year);
    } else {
      return this.getUmAlQurraMonthData(day, month, year);
    }
  }

  getGregorianMonthData(
    day: number,
    month: number,
    year: number,
  ): DayInfo[] | null {
    const yearData = this.calendarData[year];
    if (!yearData) return null;
    const monthData = yearData[month];
    if (!monthData) return null;
    const monthArray: DayInfo[] = [];
    const endDate = new Date(year, month, 0);
    for (let d = 1; d <= endDate.getDate(); d++) {
      const offset = d - 1;

      monthArray.push({
        gD: `${d.toString().padStart(2, '0')}/${month
          .toString()
          .padStart(2, '0')}/${year}`,
        uD: this.calculateUmAlQurraDate(
          monthData.fD.uD,
          offset,
          monthData.fD.uC,
        ),
        dN: this.getDayName(new Date(year, month - 1, d).getDay()),
        uC: monthData.fD.uC,
      });
    }

    return monthArray;
  }

  getUmAlQurraMonthData(
    day: number,
    month: number,
    year: number,
  ): DayInfo[] | null {
    for (const gregorianYear in this.calendarData) {
      const yearData = this.calendarData[parseInt(gregorianYear)];

      for (const monthIndex in yearData) {
        const monthData = yearData[parseInt(monthIndex)];
        const [fDay, fMonth, fYear] = monthData?.fD?.uD?.split('/').map(Number);

        if (fYear === year && fMonth === month) {
          const totalDays = monthData.fD.uC;
          const monthArray: DayInfo[] = [];
          const umAlQurraStartDate = `01/${month
            .toString()
            .padStart(2, '0')}/${year}`;
          const dayDifference = fDay - 1;

          const startGregorianDate = this.calculateGregorianDate(
            monthData.fD.gD,
            -dayDifference,
          );

          for (let i = 0; i < totalDays; i++) {
            const uDate = this.calculateUmAlQurraDate(
              umAlQurraStartDate,
              i,
              totalDays,
            );
            const gDate = this.calculateGregorianDate(startGregorianDate, i);
            const [gDay, gMonth, gYear] = gDate?.split('/').map(Number);
            const dayName = this.getDayName(
              new Date(gYear, gMonth - 1, gDay).getDay(),
            );

            monthArray.push({
              gD: gDate,
              uD: uDate,
              dN: dayName,
              uC: totalDays,
            });
          }

          return monthArray;
        }
      }
    }

    return null;
  }

  calculateGregorianDate(startGDate: string, offset: number): string {
    const [day, month, year] = startGDate?.split('/').map(Number);
    const newDate = new Date(year, month - 1, day + offset);

    return `${newDate.getDate().toString().padStart(2, '0')}/${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${newDate.getFullYear()}`;
  }

  calculateUmAlQurraDate(
    startUDate: string,
    offset: number,
    uC: number,
  ): string {
    const [day, month, year] = startUDate?.split('/').map(Number);

    let newDay = day + offset;
    let newMonth = month;
    let newYear = year;

    while (newDay > uC) {
      newDay -= uC;
      newMonth += 1;
    }

    while (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    return `${newDay.toString().padStart(2, '0')}/${newMonth
      .toString()
      .padStart(2, '0')}/${newYear}`;
  }

  getDayName(dayIndex: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  }

  /// Check date is it in past or future
  checkPastOrFuture(inputDate: any, targetDate: any) {
    if (inputDate) {
      const [day, month, year] = inputDate?.split('/').map(Number);
      const dateToCheck = new Date(year, month - 1, day);
      const today = targetDate;
      today.setHours(0, 0, 0, 0);
      if (dateToCheck > today) {
        return 'Future';
      } else if (dateToCheck < today) {
        return 'Past';
      } else {
        return 'Today';
      }
    }
  }

  /// Convert english numbers to arabic equivalent
  parseEnglish(englishNum: any) {
    if (!englishNum) return englishNum;
    const numStr = String(englishNum);
    const arabicNumbers = [
      '\u0660',
      '\u0661',
      '\u0662',
      '\u0663',
      '\u0664',
      '\u0665',
      '\u0666',
      '\u0667',
      '\u0668',
      '\u0669',
    ];
    return numStr.replace(/[0-9]/g, (digit) => {
      return arabicNumbers[Number(digit)] || digit;
    });
  }

  /// Convert arabic numbers to english equivalent
  parseArabic(arabicNum: any) {
    return arabicNum.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d: string) {
      return d.charCodeAt(0) - 1632;
    });
  }

  /**
   * Normalize date string to a consistent format with automatic detection
   * Handles any common date format and returns standardized output
   * @param dateStr - Input date string in any common format
   * @returns Object with normalized date string and format type, or null if invalid
   */
  normalizeDate(dateStr: string): { normalized: string; isGregorian: boolean } | null {
    if (!dateStr || typeof dateStr !== 'string') {
      return null;
    }

    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Step 1: Convert Arabic-Indic numerals to English numerals
    let normalized = dateStr.trim()
      .split('')
      .map((char) => {
        const index = arabicNumbers.indexOf(char);
        return index > -1 ? englishNumbers[index] : char;
      })
      .join('');

    // Step 2: Replace all hyphens with forward slashes for consistency
    normalized = normalized.replace(/-/g, '/');

    // Step 3: Split by separator and validate
    const parts = normalized.split('/').filter(part => part.length > 0);

    if (parts.length !== 3) {
      return null; // Invalid: must have exactly 3 parts
    }

    // Validate that all parts are numeric
    if (!parts.every(part => /^\d+$/.test(part))) {
      return null; // Invalid: all parts must be numeric
    }

    let year: string, month: string, day: string;
    let isGregorian = false;

    // Step 4: Smart detection - identify year by finding 4-digit number
    const yearIndex = parts.findIndex(part => part.length === 4);

    if (yearIndex === -1) {
      // No 4-digit part found - try 2-digit year (ambiguous, default to Hijri DD/MM/YY)
      if (parts.every(part => part.length <= 2)) {
        // Assume DD/MM/YY format (Hijri)
        day = parts[0].padStart(2, '0');
        month = parts[1].padStart(2, '0');
        // Convert 2-digit year to 4-digit (assume 20xx for years 00-99)
        const yearNum = parseInt(parts[2], 10);
        year = yearNum < 100 ? `20${parts[2].padStart(2, '0')}` : parts[2].padStart(4, '0');
        isGregorian = false;
      } else {
        return null; // Invalid: ambiguous format
      }
    } else if (yearIndex === 0) {
      // Format: YYYY/MM/DD or YYYY/DD/MM (could be Gregorian or Hijri)
      year = parts[0].padStart(4, '0');
      month = parts[1].padStart(2, '0');
      day = parts[2].padStart(2, '0');

      // Determine if Gregorian or Hijri based on year value
      const yearNum = parseInt(year, 10);
      // Hijri years typically 1300-1500, Gregorian years typically > 1800
      isGregorian = yearNum > 1800;

      // Smart validation: if month > 12, swap day and month
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      if (monthNum > 12 && dayNum <= 12) {
        [month, day] = [day, month];
      }
    } else if (yearIndex === 2) {
      // Format: DD/MM/YYYY or MM/DD/YYYY (could be either)
      year = parts[2].padStart(4, '0');
      const first = parts[0].padStart(2, '0');
      const second = parts[1].padStart(2, '0');

      // Smart detection: determine if it's DD/MM or MM/DD
      const firstNum = parseInt(first, 10);
      const secondNum = parseInt(second, 10);

      if (firstNum > 12) {
        // First part > 12, must be day
        day = first;
        month = second;
      } else if (secondNum > 12) {
        // Second part > 12, must be day (so first is month)
        month = first;
        day = second;
      } else {
        // Ambiguous (both <= 12) - default to DD/MM/YYYY format
        day = first;
        month = second;
      }

      // Determine if Gregorian or Hijri based on year value
      const yearNum = parseInt(year, 10);
      // Gregorian years typically > 1900, Hijri years typically 1300-1500
      isGregorian = yearNum > 1800;
    } else {
      // Middle position (rare, e.g., DD/YYYY/MM or MM/YYYY/DD)
      return null; // Unsupported format
    }

    // Step 5: Validate extracted values
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    if (yearNum < 1 || yearNum > 9999 ||
        monthNum < 1 || monthNum > 12 ||
        dayNum < 1 || dayNum > 31) {
      return null; // Invalid date values
    }

    // Step 6: Return normalized date in appropriate format
    // Gregorian: YYYY/MM/DD
    // Hijri: DD/MM/YYYY
    const normalizedDate = isGregorian
      ? `${year}/${month}/${day}`
      : `${day}/${month}/${year}`;

    return {
      normalized: normalizedDate,
      isGregorian: isGregorian
    };
  }

  /**
   * Convert date numerals between Arabic-Indic and Western Arabic
   * Accepts any common date format and automatically normalizes before conversion
   * @param date - Input date string in any common format
   * @param targetLang - Target language: 'ar' for Arabic-Indic numerals, 'en' for Western Arabic
   * @returns Date string with converted numerals in the detected format, or original string if invalid
   */
  convertDateNumerals(date: string, targetLang: 'en' | 'ar'): string {
    if (!date || typeof date !== 'string') {
      return date;
    }

    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Helper: Convert Western Arabic numerals to Arabic-Indic
    const toArabic = (value: string): string =>
      value
        .split('')
        .map((char) => (/\d/.test(char) ? arabicNumbers[+char] : char))
        .join('');

    // Helper: Convert Arabic-Indic numerals to Western Arabic
    const toEnglish = (value: string): string =>
      value
        .split('')
        .map((char) => {
          const index = arabicNumbers.indexOf(char);
          return index > -1 ? englishNumbers[index] : char;
        })
        .join('');

    // Step 1: Normalize the input date to handle any format
    const normalizedResult = this.normalizeDate(date);

    if (!normalizedResult) {
      // If normalization fails, attempt basic conversion on original string
      return targetLang === 'ar' ? toArabic(date) : toEnglish(date);
    }

    const { normalized } = normalizedResult;

    // Step 2: Apply numeral conversion based on target language
    if (targetLang === 'ar') {
      // Convert to Arabic-Indic numerals
      return toArabic(normalized);
    } else {
      // Convert to English numerals (already normalized to English)
      return normalized;
    }
  }

  /**
   * Normalize input date to DD/MM/YYYY string format (Gregorian)
   * Accepts Date object or DD/MM/YYYY string
   */
  normalizeDateToString(date: Date | string | undefined): string | null {
    if (!date) return null;

    if (date instanceof Date) {
      return this.formatDate(date);
    }

    // Already a string - validate format
    const parsed = this.parseDate(date);
    return parsed ? this.formatDate(parsed) : null;
  }

  /**
   * Compare two dates (Gregorian format DD/MM/YYYY)
   * Returns: -1 if date1 < date2, 0 if equal, 1 if date1 > date2
   */
  compareDates(date1Str: string, date2Str: string): number {
    const d1 = this.parseDate(date1Str);
    const d2 = this.parseDate(date2Str);

    if (!d1 || !d2) return 0;

    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
  }

  /**
   * Compare two Hijri dates (UM format DD/MM/YYYY)
   * Converts to Gregorian for comparison
   */
  compareHijriDates(hijri1: string, hijri2: string): number {
    const day1 = this.convertDate(hijri1, false);
    const day2 = this.convertDate(hijri2, false);

    if (!day1?.gD || !day2?.gD) return 0;

    return this.compareDates(day1.gD, day2.gD);
  }

  /**
   * Check if a date is within the specified range (inclusive)
   * All dates in Gregorian DD/MM/YYYY format
   */
  isDateInRange(
    dateStr: string,
    minDateStr: string | null,
    maxDateStr: string | null,
  ): boolean {
    if (!dateStr) return false;

    // If no constraints, date is valid
    if (!minDateStr && !maxDateStr) return true;

    // Check minimum constraint
    if (minDateStr && this.compareDates(dateStr, minDateStr) < 0) {
      return false;
    }

    // Check maximum constraint
    if (maxDateStr && this.compareDates(dateStr, maxDateStr) > 0) {
      return false;
    }

    return true;
  }

  /**
   * Check if a Hijri date is within the specified range
   * Converts to Gregorian for comparison
   */
  isHijriDateInRange(
    hijriDateStr: string,
    minDateStr: string | null,
    maxDateStr: string | null,
  ): boolean {
    if (!hijriDateStr) return false;

    const dayInfo = this.convertDate(hijriDateStr, false);
    if (!dayInfo?.gD) return false;

    return this.isDateInRange(dayInfo.gD, minDateStr, maxDateStr);
  }

  transformDate(dateString: string) {
    const date = new Date(dateString);
    // Gregorian date (DD/MM/YYYY)
    const gD = `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}/${date.getFullYear()}`;

    // Day name
    const dN = date.toLocaleDateString('en-US', { weekday: 'long' });

    // Time
    const time = {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };

    // Hijri (Umm Al-Qura)
    const hijriFormatter = new Intl.DateTimeFormat(
      'ar-SA-u-ca-islamic-umalqura-nu-latn',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    );

    const hijriParts = hijriFormatter.formatToParts(date);

    const day = hijriParts.find((p) => p.type === 'day')?.value;
    const month = hijriParts.find((p) => p.type === 'month')?.value;
    const year = hijriParts.find((p) => p.type === 'year')?.value;

    const uD = `${day}/${month}/${year}`;

    return {
      gD,
      uD,
      dN,
      uC: 0,
      selected: true,
      time,
    };
  }
}
