import { Component } from '@angular/core';
import { SupplyComponent } from '../supply/supply.component';
import { SupplyService } from '../supply/supply.service';

@Component({
  selector:    'app-supply-registration',
  templateUrl: './supply-registration.component.html',
  styleUrls:   [ './supply-registration.component.css' ]
})
export class SupplyRegistrationComponent {

  service;
  supply = new SupplyComponent();
  types = [
    '',
    'Proteína',
    'Carboidrato',
    'Vitamina'
  ];

  constructor( service: SupplyService ) {
    this.service = service;
  }

  onChange( newValue ) {
    this.supply.type = newValue;
  }

  register( event ) {
    event.preventDefault();

    this.service
      .register( this.supply )
      .then( msg => {
        console.log( msg );
      })
      .catch( msg => {
        console.log( msg );
      });
  }

}
