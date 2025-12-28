export interface stylesConfig {
  backgroundColor?: string; // Overall background color of the datepicker
  primaryColor?: string; // Primary accent color
  secondaryColor?: string; // Secondary accent color
  todaysDateBgColor?: string; // Background color for today's date
  todaysDateTextColor?: string; // Text color for today's date
  confirmBtnTextColor?: string; // Text color for the confirm button
  disabledDayColor?: string; // Color for disabled/unselectable days
  dayNameColor?: string; // Color for day names (e.g., Mon, Tue)
  dayColor?: string; // Color for regular day numbers
  fontFamily?: string; // Font family for datepicker text
  borderRadius?: string; // Border radius for datepicker elements
  // Time picker colors
  timePickerBgColor?: string; // Background color for time input fields
  timePickerTextColor?: string; // Text color for time display
  timePickerBorderColor?: string; // Border color for time inputs
  timePickerArrowColor?: string; // Color for up/down arrow icons
  timePickerColonColor?: string; // Color for colon separator
  meridianBgColor?: string; // Background color for AM/PM buttons
  meridianTextColor?: string; // Text color for AM/PM buttons
  meridianActiveBgColor?: string; // Background color for active AM/PM button
  meridianActiveTextColor?: string; // Text color for active AM/PM button
}
