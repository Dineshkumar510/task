import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

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
  total = 200; 
  limit = 8;   
  offset = 0;  
  dropdownOpen = false;
  selectedOption: Option | null = null;  

  options = new BehaviorSubject<Option[]>([]);
  options$: Observable<Option[]>;

  private names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Michael White'];
  private emails = ['john@example.com', 'jane@example.com', 'alice@example.com', 'bob@example.com', 'michael@example.com'];

  constructor(private cdr: ChangeDetectorRef) {
    this.options$ = this.options.asObservable().pipe(
      scan<Option[], Option[]>((acc, curr) => [...acc, ...curr], [])
    );
  }

  ngOnInit() {
    this.getNextBatch(); 
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen && this.offset === 0) {
      this.getNextBatch();  
    }
  }

  getNextBatch() {
    if (this.offset >= this.total) return;

    const result = Array.from({ length: this.limit }).map(() => this.generateRandomOption());
    console.log('Loading new batch:', result); 
    this.options.next(result);
    this.offset += this.limit;
    this.cdr.detectChanges();  
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
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      this.getNextBatch();  
    }
  }

  selectOption(option: Option) {
    this.selectedOption = option;
    this.dropdownOpen = false;  
  }
}
