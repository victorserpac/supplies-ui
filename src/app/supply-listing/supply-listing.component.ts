import { Component } from '@angular/core';
import { SupplyService } from '../supply/supply.service';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector:    'supply-listing',
  templateUrl: './supply-listing.component.html',
  styleUrls:   [ './supply-listing.component.css' ]
})
export class SupplyListingComponent {

  message = '';
  supplies = [];
  markers;

  // Services
  supplyService;
  geolocationService;

  // Map defaults
  lat  = 0;
  lng  = 0;
  zoom = 2;

  constructor(
    supplyService: SupplyService,
    geolocationService: GeolocationService
  ) {
    this.supplyService      = supplyService;
    this.geolocationService = geolocationService;

    // First list all supplies
    this.supplyService
      .list()
      .then( supplies => this.supplies = supplies )
      .catch( msg => this.message = msg );

    // List markers to put in map
    this.supplyService
      .getMarkers()
      .then( markers => this.markers = markers )
      .catch( msg => this.message = msg );

    // Update map and supplis list with GeoLocation
    this.geolocationService
      .getCurrentPosition()
      .then( latLng => {
        this.lat  = latLng.lat;
        this.lng  = latLng.lng;
        this.zoom = 8;

        return latLng;
      })
      .then( latLng => this.supplyService.sortByClosest({
          lat: latLng.lat,
          lng: latLng.lng,
      }))
      .then( supplies => this.supplies = supplies )
      .catch( msg => this.message = msg );
  }

}
