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
  markers;

  lat: number = -27.1136184;
  lng: number = -50.8356141;
  zoom = 14;

  constructor( service: SupplyService ) {
    this.service = service;

    this.service
      .list()
      .then( supplies => this.supplies = supplies )
      .then( supplies => {
        this.markers = supplies.map( item => {
          if ( item.location ) {
            return {
              lat: +item.location.split( ',' )[ 0 ] || null,
              lng: +item.location.split( ',' )[ 1 ] || null,
              info: item.name
            }
          }
        })
      })
      .catch( msg => console.log( msg ) )

      //set current position
      this.setCurrentPosition();
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 14;
      });
    }
  }

}
