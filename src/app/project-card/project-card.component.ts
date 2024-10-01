import { Component, EventEmitter, Input, Output } from '@angular/core';

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
    activitycard: boolean = false;
    @Output() contentVisibilityChange = new EventEmitter<boolean>();
    @Output() selectedRowsChange = new EventEmitter<any[]>();

    editedFieldIndex: number | null = null;
    editedFieldName: string | null = null;
    totalTime: string = '';
    originalTotalTime: string = '01:00:00';
    isContentVisible: boolean = false;
    isTimeChanged: boolean = false;
    rows = [
      { title: 'Double click to type here',
        description: 'Double click to type here',
        time: '01:00:00',
        exceeds: false,
        selected: true
      }
    ];

  availableTime: string = '00:00:00';
  countdownInterval: any;

    constructor() {
      this.updateTime();
    }

    ngOnInit(): void {
      const savedRows = JSON.parse(localStorage.getItem('selectedRows') || '[]');
      if (savedRows.length > 0) {
        this.rows = savedRows;
      }
    }

    toggleContent() {
      this.isContentVisible = !this.isContentVisible;
      this.contentVisibilityChange.emit(this.isContentVisible);
    }

    addRow() {
      this.rows.push({ title: 'Default Title', description: '', time: '00:00:00', exceeds: false, selected: false });
      this.updateTime();
    }

  startCountdown(time: string) {
    console.log("new Time Row::",time);
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    let [hours, minutes, seconds] = time.split(':').map(Number);
    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    this.countdownInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(this.countdownInterval);
        this.availableTime = '00:00:00';
        return;
      }
      totalSeconds--;
      const countdownHours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const countdownMinutes = Math.floor(totalSeconds / 60);
      const countdownSeconds = totalSeconds % 60;
      this.availableTime = `${this.padZero(countdownHours)}:${this.padZero(countdownMinutes)}:${this.padZero(countdownSeconds)}`;
    }, 1000);
  }

  stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.availableTime = '00:00:00';
    }
  }

    editField(index: number, fieldName: string) {
      this.editedFieldIndex = index;
      this.editedFieldName = fieldName;
    }

    saveField(row:any, event:any) {
      this.editedFieldIndex = null;
      this.editedFieldName = null;
      localStorage.setItem('selectedRows', JSON.stringify(row));
    }


    toggleActivitycard(){
      this.activitycard = !this.activitycard;
    }

    updateTime() {
      let totalSeconds = 0;
      let hasExceeded = false;

      this.rows.forEach(row => {
        if(row.time){
          this.startCountdown(row.time);
        }
        const timeParts = row.time.split(':');
        if (timeParts.length === 3) {
          const [hours, minutes, seconds] = timeParts.map(Number);
          totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
        }
        const originalTimeParts = this.originalTotalTime.split(':').map(Number);
        const originalTotalSeconds = (originalTimeParts[0] * 3600) + (originalTimeParts[1] * 60) + originalTimeParts[2];

        const rowTimeParts = row.time.split(':').map(Number);
        const rowTotalSeconds = (rowTimeParts[0] * 3600) + (rowTimeParts[1] * 60) + rowTimeParts[2];
        row.exceeds = rowTotalSeconds > originalTotalSeconds;
        if (row.exceeds) {
          hasExceeded = true;
        }
      });
      if (!hasExceeded) {
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        this.totalTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      }
      this.isTimeChanged = (this.totalTime !== this.originalTotalTime);
    }

    handleRowSelection(row: any, event: any) {
      row.selected = event.target.checked;
      const selectedRows = this.rows.filter(r => r.selected);
      this.selectedRowsChange.emit(selectedRows);
      localStorage.setItem('selectedRows', JSON.stringify(selectedRows));
    }

    padZero(num: number): string {
      return num < 10 ? `0${num}` : `${num}`;
    }


  deleteRow(index: number) {
    this.rows.splice(index, 1);
    if (this.rows.length === 0) {
      this.stopCountdown();
    }
  }
  }
