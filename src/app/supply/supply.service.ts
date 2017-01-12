import { Injectable } from '@angular/core';

@Injectable()
export class SupplyService {

  keyWord;

  constructor() {
    this.keyWord = 'supply';
  }

  list() {
    return new Promise( ( resolve, reject ) => {
      let i = true;

      // let lastSupply = Object.getOwnPropertyNames( localStorage )
      //   .filter( item => item.split( '-' )[ 0 ] == 'supply' )
      //   .sort( ( a: any, b: any ) =>  a.split( '-' )[ 1 ] - b.split( '-' )[ 1 ] )
      //   .pop();
      // Find in localstorage

      setTimeout( () => {

        if ( i ) {
          resolve( 'Suprimentos listados!' );
        } else {
          reject( 'Houve um problema ao listar os suprimentos' );
        }
      }, 1000 );

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
