import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SupplyModule } from './supply/supply.module';
import { FooModule } from './foo/foo.module';
import { MyDatePickerModule } from 'mydatepicker';
import { AgmCoreModule } from "angular2-google-maps/core";

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { SupplyRegistrationComponent } from './supply-registration/supply-registration.component';
import { SupplyListingComponent } from './supply-listing/supply-listing.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    SupplyModule,
    FooModule,
    MyDatePickerModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCRzRSIDKNJOEEXJhOkSh4tUNcoTk8NChA",
      libraries: ["places"]
    }),
  ],
  declarations: [
    AppComponent,
    SupplyRegistrationComponent,
    SupplyListingComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
