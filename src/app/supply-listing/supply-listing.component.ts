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

  lat: number = 0;
  lng: number = 0;
  zoom = 2;

  constructor( service: SupplyService ) {
    this.service = service;

    this.service
      .list({
        lat: this.lat,
        lng: this.lng,
      })
      .then( supplies => this.markers = supplies.map( item => ({
        lat: +item.location.lat,
        lng: +item.location.lng,
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
          this.zoom = 5;
          resolve();
        });
      }
    });
  }

}
