import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CustomDropdownComponent} from './custom-dropdown/custom-dropdown.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { CustomDatePickerComponent } from './custom-date-picker/custom-date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CustomDropdownComponent,
    ProjectCardComponent,
    CustomDatePickerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // Keep it once
    FormsModule,
    MatSelectInfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
