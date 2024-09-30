import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
  export class ProjectCardComponent {
    // Inputs and Outputs remain unchanged
    @Input() projectTitle: string = '';
    @Input() organization: string = '';
    @Input() time: string = '';
    @Input() timeSum: string = '';
    @Output() contentVisibilityChange = new EventEmitter<boolean>();
    @Output() selectedRowsChange = new EventEmitter<any[]>();

    editedFieldIndex: number | null = null;
    editedFieldName: string | null = null;
    totalTime: string = '01:00:00';
    originalTotalTime: string = '01:00:00';
    isContentVisible: boolean = false;
    isTimeChanged: boolean = false;

    rows = [
      { title: 'Double click to type here', description: 'Double click to type here', time: '01:00:00', exceeds: false, selected: true }
    ];

    constructor() {
      this.updateTime();
    }

    ngOnInit(): void {
      const savedRows = JSON.parse(localStorage.getItem('selectedRows') || '[]');

      // If there are saved rows, load them into the rows array
      if (savedRows.length > 0) {
        this.rows = savedRows;
      }
    }

    toggleContent() {
      this.isContentVisible = !this.isContentVisible;
      this.contentVisibilityChange.emit(this.isContentVisible);
    }

    // Add new row with selected as false by default
    addRow() {
      this.rows.push({ title: 'Double click to type here', description: 'Double click to type here', time: '00:00:00', exceeds: false, selected: false });
      this.updateTime();
    }

    // Handle the double-click event to edit the field
    editField(index: number, fieldName: string) {
      this.editedFieldIndex = index;
      this.editedFieldName = fieldName;
    }

    // Save the edited field and exit input mode
    saveField() {
      this.editedFieldIndex = null;
      this.editedFieldName = null;
    }


    // Update the total time whenever the time changes
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

    // Handle row selection and save to local storage
    handleRowSelection(row: any, event: any) {
      row.selected = event.target.checked;
      const selectedRows = this.rows.filter(r => r.selected);
      this.selectedRowsChange.emit(selectedRows);
      localStorage.setItem('selectedRows', JSON.stringify(selectedRows));
    }

    // Helper to pad single digits with a leading zero
    padZero(num: number): string {
      return num < 10 ? `0${num}` : `${num}`;
    }
  }
