import { Injectable } from '@angular/core';

@Injectable()
export class SupplyService {

  constructor() { }

  list() {
    return new Promise( ( resolve, reject ) => {
      let i = true;

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
      let i = true;

      // Store in localstorage

      setTimeout( () => {



        if ( i ) {
          resolve( 'Suprimento cadastrado!' );
        } else {
          reject( 'Houve um problema ao cadastrar' );
        }
      }, 1000 );

    });
  }

}
