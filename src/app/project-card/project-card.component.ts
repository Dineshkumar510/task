import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() projectTitle: string = '';
  @Input() organization: string = '';
  @Input() time: string = '';
  @Input() timeSum: string = '';

  editedFieldIndex: number | null = null;
  editedFieldName: string | null = null;
  totalTime: string = '01:00:00';
  originalTotalTime: string = '01:00:00';

  isContentVisible: boolean = false;
  isTimeChanged: boolean = false;

  constructor() {
    this.updateTime();
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  rows = [
    { title: 'Double click to type here', description: 'Double click to type here', time: '01:00:00', exceeds: false}
  ];

  // Add a new row when the "New" button is clicked
  addRow() {
    this.rows.push({ title: 'Double click to type here', description: 'Double click to type here', time: '00:00:00',exceeds: false });
    this.updateTime();
  }

   // Handle the double-click event to edit the field
   editField(index: number, fieldName: string) {
    this.editedFieldIndex = index;
    this.editedFieldName = fieldName;
  }

  // Save the edited field and exit the input mode
  saveField() {
    this.editedFieldIndex = null;
    this.editedFieldName = null;
  }

  // Update the total time whenever the time changes
  // Update the total time and validate duration
  // Update the total time and validate duration
  updateTime() {
    let totalSeconds = 0;
    let hasExceeded = false; // Track if any row exceeds the original time

    this.rows.forEach(row => {
      const timeParts = row.time.split(':');
      if (timeParts.length === 3) {
        const [hours, minutes, seconds] = timeParts.map(Number);
        totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
      }

      const originalTimeParts = this.originalTotalTime.split(':').map(Number);
      const originalTotalSeconds = (originalTimeParts[0] * 3600) + (originalTimeParts[1] * 60) + originalTimeParts[2];

      // Check if the row's time exceeds the original total time
      const rowTimeParts = row.time.split(':').map(Number);
      const rowTotalSeconds = (rowTimeParts[0] * 3600) + (rowTimeParts[1] * 60) + rowTimeParts[2];
      row.exceeds = rowTotalSeconds > originalTotalSeconds;

      // If any row exceeds the allowed time, set flag
      if (row.exceeds) {
        hasExceeded = true;
      }
    });

    // Only update totalTime if no row exceeds the allowed time
    if (!hasExceeded) {
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      this.totalTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    this.isTimeChanged = (this.totalTime !== this.originalTotalTime);
  }

  // Helper to pad single digits with a leading zero
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
