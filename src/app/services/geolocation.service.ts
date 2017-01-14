import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationService {

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

}
