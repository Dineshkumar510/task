import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CustomDropdownComponent} from './custom-dropdown/custom-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CustomDropdownComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // Keep it once
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectInfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
