import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyComponent } from './supply.component';
import { SupplyService } from './supply.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SupplyComponent
  ],
  providers: [ SupplyService ]
})
export class SupplyModule { }
