import { Component } from '@angular/core';
import { SupplyService } from '../supply/supply.service';

@Component({
  selector:    'supply-listing',
  templateUrl: './supply-listing.component.html',
  styleUrls:   ['./supply-listing.component.css']
})
export class SupplyListingComponent {

  supplies = [];
  service;
  markers;

  lat: number = -27.1136184;
  lng: number = -50.8356141;
  zoom = 4;

  constructor( service: SupplyService ) {
    this.service = service;

    this.service
      .list({
        lat: this.lat,
        lng: this.lng,
      })
      .then( supplies => this.markers = supplies.map( item => ({
        lat: +item.location.split( ',' )[ 0 ] || null,
        lng: +item.location.split( ',' )[ 1 ] || null,
        info: item.name
      })))
      .catch( msg => console.log( msg ) )

      //set current position by geolocation
      this.setCurrentPosition()
        .then( () => {
          this.service.list({
            lat: this.lat,
            lng: this.lng,
          })
          .then( supplies => this.supplies = supplies )
          .catch( msg => console.log( msg ) )
        });
  }

  private setCurrentPosition() {
    return new Promise( ( resolve, reject ) => {
      if ( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition( ( position ) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 8;
          resolve();
        });
      }
    });
  }

}
