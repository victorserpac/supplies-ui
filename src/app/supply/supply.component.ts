import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {

  @Input() name;
  type;
  validate;
  location;

  constructor() {}

  ngOnInit() {
  }

}
