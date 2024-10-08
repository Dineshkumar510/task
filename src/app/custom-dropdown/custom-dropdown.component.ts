import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

interface Option {
  name: string;
  email: string;
  color: string;
  initials: string;
}

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
  total = 200; // Maximum number of items
  limit = 8;  // Items to load in each batch
  offset = 0;  // Tracks the number of loaded items
  dropdownOpen = false;
  selectedOption: Option | null = null;  // Track the selected option

  options = new BehaviorSubject<Option[]>([]);
  options$: Observable<Option[]>;

  private names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Michael White'];
  private emails = ['john@example.com', 'jane@example.com', 'alice@example.com', 'bob@example.com', 'michael@example.com'];

  constructor() {
    this.options$ = this.options.asObservable().pipe(
      scan<Option[], Option[]>((acc, curr) => [...acc, ...curr], [])
    );
  }

  ngOnInit() {
    this.getNextBatch();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getNextBatch() {
    if (this.offset >= this.total) return;

    const result = Array.from({ length: this.limit }).map(() => this.generateRandomOption());
    this.options.next(result);
    this.offset += this.limit;
  }

  generateRandomOption(): Option {
    const name = this.names[Math.floor(Math.random() * this.names.length)];
    const email = this.emails[Math.floor(Math.random() * this.emails.length)];
    const color = this.getRandomColor();
    const initials = this.getInitials(name);

    return { name, email, color, initials };
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getInitials(name: string): string {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.getNextBatch();
    }
  }

  // Method to select the clicked option
  selectOption(option: Option) {
    this.selectedOption = option;
    this.dropdownOpen = false;  // Close dropdown after selection
  }
}
