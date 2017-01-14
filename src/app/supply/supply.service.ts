import { Injectable } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';

@Injectable()
export class SupplyService {

  keyWord;

  // Services
  geolocationService;

  constructor(
    geolocationService: GeolocationService
  ) {
    this.geolocationService = geolocationService;
    this.keyWord = 'supply';
  }

  // List all supplies by registration time
  list() {
    return new Promise( ( resolve, reject ) => {

      setTimeout( () => resolve(
        this.getFromLocalStorage()
          .sort( ( a: any, b: any ) =>  a.time - b.time )
      ), 1000 );
    });
  }

  // List all supplies and return an marker object formatted
  getMarkers() {
    return new Promise( ( resolve, reject ) => {

      setTimeout( () => resolve(
        this.getFromLocalStorage()
          .map( item => ({
            lat:  +item.location.lat,
            lng:  +item.location.lng,
            info: item.name
          }))
      ), 1000 );
    });
  }

  // List all supplies sorting by the closests ones
  sortByClosest( currentLocation ) {
    return new Promise( ( resolve, reject ) => {

      setTimeout( () => resolve(
        this.getFromLocalStorage()
          .sort( ( a: any, b: any ) =>
            this.geolocationService.getCoordsDistance( currentLocation, a.location ) -
            this.geolocationService.getCoordsDistance( currentLocation, b.location )
          )
      ), 1000 );
    });
  }

  // Register data in Local Storage
  register( supply ) {
    return new Promise( ( resolve, reject ) => {
      let key = `${ this.keyWord }-${ new Date().getTime() }`;

      setTimeout( () => {
        localStorage[ key ] = JSON.stringify( supply );
        resolve( 'Suprimento cadastrado!' );
      }, 1000 );

    });
  }

  // Get data from Local Storage
  getFromLocalStorage() {
    return Object.getOwnPropertyNames( localStorage )
      .filter( item => item.split( '-' )[ 0 ] == this.keyWord )
      .map( item => {
        let supply = JSON.parse( localStorage[ item ] );
        let date   = new Date( supply.validate );

        return Object.assign(supply, {
          validate: {
            jsdate: date,
            formatted: `${ ( "0" + date.getDate() ).slice( -2 ) }/${ ( "0" + ( date.getMonth() + 1 ) ).slice( -2 ) }/${ date.getFullYear() }`
          },
          time: item.split( '-' )[ 1 ]
        });
      });
  }

}
