import { Component } from '@angular/core';
import { SupplyService } from '../supply/supply.service';

@Component({
  selector: 'supply-listing',
  templateUrl: './supply-listing.component.html',
  styleUrls: ['./supply-listing.component.css']
})
export class SupplyListingComponent {

  supplies = [];
  service;

  constructor( service: SupplyService ) {
    this.service = service;

    this.service
      .list()
      .then( supplies => this.supplies = supplies )
      // .then( supplies => console.log( supplies ) )
      .catch( msg => console.log( msg ) )
  }

}
