import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService {

  // Get current position by Geolocation
  getCurrentPosition() {
    return new Promise( ( resolve, reject ) => {
      if ( "geolocation" in navigator ) {

        navigator.geolocation.getCurrentPosition( ( position ) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }, () => {
          reject( 'Não foi possível obter a localização atual' );
        });
      }
    });
  }

  // Get distance between 2 coordinates in KM
  getCoordsDistance( coord1, coord2 ) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad( coord2.lat - coord1.lat );  // deg2rad below
    let dLon = this.deg2rad( coord2.lng - coord1.lng );
    let a =
      Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
      Math.cos( this.deg2rad( coord1.lat ) ) * Math.cos( this.deg2rad( coord2.lat ) ) *
      Math.sin( dLon / 2 ) * Math.sin( dLon / 2 );
    let c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );
    return R * c; // Distance in km
  }

  // Convert degrees to radians
  deg2rad( deg ) {
    return deg * ( Math.PI / 180 );
  }

}
