import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

interface Option {
  name: string;
  email: string;
  color: string;
  initials: string;  // New property for initials
}

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
  title = 'Angular Material Select Infinite Scroll';

  total = 100; // Maximum number of items
  limit = 10;  // Items to load in each batch
  offset = 0;  // Tracks the number of loaded items

  options = new BehaviorSubject<Option[]>([]);
  options$: Observable<Option[]>;

  // Array of dummy names and emails for random selection
  private names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Michael White'];
  private emails = ['john@example.com', 'jane@example.com', 'alice@example.com', 'bob@example.com', 'michael@example.com'];

  constructor() {
    this.options$ = this.options.asObservable().pipe(
      scan<Option[], Option[]>((acc, curr) => [...acc, ...curr], []) // Accumulate options
    );
  }

  ngOnInit() {
    // Load the first batch when the component initializes
    this.getNextBatch();
  }

  // Method to load the next batch of options
  getNextBatch() {
    if (this.offset >= this.total) return;  // Stop if all items are loaded

    const result = Array.from({ length: this.limit }).map(() => this.generateRandomOption());
    this.options.next(result);  // Push new options into the BehaviorSubject
    this.offset += this.limit;  // Increment the offset
  }

  // Generate a random option with name, email, color, and initials
  private generateRandomOption(): Option {
    const name = this.names[Math.floor(Math.random() * this.names.length)];
    const email = this.emails[Math.floor(Math.random() * this.emails.length)];
    const color = this.getRandomColor();
    const initials = this.getInitials(name);  // Generate initials from the name

    return { name, email, color, initials };
  }

  // Helper method to generate random hex color
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Helper method to extract initials from the name
  private getInitials(name: string): string {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  }
}
