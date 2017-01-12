import { Injectable } from '@angular/core';

@Injectable()
export class SupplyService {

  keyWord;

  constructor() {
    this.keyWord = 'supply';
  }

  list() {
    return new Promise( ( resolve, reject ) => {

      let supplies = Object.getOwnPropertyNames( localStorage )
        .filter( item => item.split( '-' )[ 0 ] == 'supply' )
        .sort( ( a: any, b: any ) =>  a.split( '-' )[ 1 ] - b.split( '-' )[ 1 ] )
        .map( item => JSON.parse( localStorage[ item ] ) );

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

}
