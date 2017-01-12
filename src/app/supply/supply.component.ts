import { Component, Input } from '@angular/core';

@Component({
  selector: 'supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent {

  @Input() name;
  type;
  validate;
  location;

}
