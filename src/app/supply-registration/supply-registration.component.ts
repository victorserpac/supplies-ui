import { Component, OnInit } from '@angular/core';
import { SupplyComponent } from '../supply/supply.component';

@Component({
  selector: 'app-supply-registration',
  templateUrl: './supply-registration.component.html',
  styleUrls: ['./supply-registration.component.css']
})
export class SupplyRegistrationComponent implements OnInit {

  supply = new SupplyComponent();
  types = [
    '',
    'proteína',
    'carboidrato',
    'vitamina'
  ];

  constructor() {
    console.log( this.supply );
  }

  ngOnInit() {
  }

  onChange( newValue ) {
    console.log(newValue);
    this.supply.type = newValue;
  }

  register( event ) {

    event.preventDefault();

    console.log( event );
    console.log( this.supply );
  }

}
