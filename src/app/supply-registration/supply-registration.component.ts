import { Component } from '@angular/core';
import { SupplyComponent } from '../supply/supply.component';
import { SupplyService } from '../supply/supply.service';

@Component({
  selector: 'app-supply-registration',
  templateUrl: './supply-registration.component.html',
  styleUrls: ['./supply-registration.component.css']
})
export class SupplyRegistrationComponent {

  supply = new SupplyComponent();
  types = [
    '',
    'Proteína',
    'Carboidrato',
    'Vitamina'
  ];
  service;

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
      .then( foo => {
        console.log( foo );
      })
      .catch( foo => {
        console.log( foo );
      });
  }

}
