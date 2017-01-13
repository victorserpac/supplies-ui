import { Injectable } from '@angular/core';

@Injectable()
export class SupplyService {

  keyWord;

  constructor() {
    this.keyWord = 'supply';
  }

  list( latLng ) {
    return new Promise( ( resolve, reject ) => {

      let supplies = Object.getOwnPropertyNames( localStorage )
        .filter( item => item.split( '-' )[ 0 ] == 'supply' )
        // .sort( ( a: any, b: any ) =>  a.split( '-' )[ 1 ] - b.split( '-' )[ 1 ] )
        .map( item => {
          let supply = JSON.parse( localStorage[ item ] );
          let date = new Date( supply.validate );
          supply.validate = {
            jsdate: date,
            formatted: `${ ( "0" + date.getDate() ).slice( -2 ) }/${ ( "0" + ( date.getMonth() + 1 ) ).slice( -2 ) }/${ date.getFullYear() }`
          }

          return supply;
        })
        .sort( ( a: any, b: any ) => {
          let distanceA = this.getDistanceFromLatLonInKm( latLng.lat, latLng.lng, a.location.split( ',' )[ 0 ], a.location.split( ',' )[ 1 ] );
          let distanceB = this.getDistanceFromLatLonInKm( latLng.lat, latLng.lng, b.location.split( ',' )[ 0 ], b.location.split( ',' )[ 1 ] );

          return distanceA - distanceB;
        });

      setTimeout( () => resolve( supplies ), 1000 );

    });
  }

  register( supply ) {

    return new Promise( ( resolve, reject ) => {

      let key = `${ this.keyWord }-${ new Date().getTime() }`;

      setTimeout( () => {
        localStorage[ key ] = JSON.stringify( supply );
        resolve( 'Suprimento cadastrado!' );
      }, 1000 );

    });
  }

  getDistanceFromLatLonInKm( lat1, lon1, lat2, lon2 ) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad( lat2 - lat1 );  // deg2rad below
    var dLon = this.deg2rad( lon2 - lon1 );
    var a =
      Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
      Math.cos( this.deg2rad( lat1 ) ) * Math.cos( this.deg2rad( lat2 ) ) *
      Math.sin( dLon / 2 ) * Math.sin( dLon / 2 )
      ;
    var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad( deg ) {
    return deg * ( Math.PI / 180 )
  }

}
