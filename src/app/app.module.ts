import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SupplyModule } from './supply/supply.module';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { SupplyRegistrationComponent } from './supply-registration/supply-registration.component';
import { SupplyListingComponent } from './supply-listing/supply-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    SupplyRegistrationComponent,
    SupplyListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SupplyModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
