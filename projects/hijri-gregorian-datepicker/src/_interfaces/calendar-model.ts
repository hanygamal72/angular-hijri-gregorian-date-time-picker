export interface MonthInfo {
  fD: DayInfo; // First day of the month
  lD: DayInfo; // Last day of the month
}

export interface YearData {
  [month: string]: MonthInfo;
}

export interface Data {
  [year: string]: YearData;
}

// Time value structure for time picker
export interface TimeValue {
  hour: number;   // 0-23 for 24-hour format
  minute: number; // 0-59
}

export interface DayInfo {
  gD: string; // Gregorian date
  uD: string; // Um al-Qurra date
  dN: string; // Day name shorthand
  uC: number; // Placeholder since we are not using it in the output
  selected?: boolean;
  disabled?: boolean; // New: indicates if day is disabled (out of min/max range)
  time?: TimeValue;   // New: optional time information
}

export interface TodayDate {
  gregorian?: string;
  ummAlQura?: string;
}

export type MonthDays = DayInfo[];
