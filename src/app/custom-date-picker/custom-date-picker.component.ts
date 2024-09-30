import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss']
})
export class CustomDatePickerComponent {
  currentDate: Date = new Date();
  selectedDay: number | null = null;
  isCalendarVisible: boolean = false;
  formattedDate: string = '';
  monthYear: string = '';

  constructor() {
    this.updateMonthYear();
    this.generateDays();
  }

  // Toggle the visibility of the calendar
  toggleCalendar() {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  // Update month and year display
  updateMonthYear() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.monthYear = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  // Generate days of the current month
  generateDays() {
    const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  // Select a date
  selectDate(day: number) {
    this.selectedDay = day;
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    this.formattedDate = this.formatDate(year, month, day);
    this.isCalendarVisible = false;
  }

  // Format date to MM/DD/YYYY
  formatDate(year: number, month: number, day: number): string {
    const formattedMonth = (month + 1).toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  // Navigate to the previous month
  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateMonthYear();
    this.generateDays();
  }

  // Navigate to the next month
  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateMonthYear();
    this.generateDays();
  }

  days: number[] = []; // Holds the days of the current month
}
